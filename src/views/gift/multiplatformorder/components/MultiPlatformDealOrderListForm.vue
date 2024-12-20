<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >

      <el-form-item label="品规" prop="productSpecification">
        <el-input v-model="formData.productSpecification" placeholder="请输入品规" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { getIntDictOptions, getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import { MultiPlatformOrderBatchApi } from '@/api/gift/multiplatformorder'

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  idList: undefined,
  orderBatchId: undefined,
  orderNo: undefined,
  recipientName: undefined,
  recipientNickname: undefined,
  recipientPhone: undefined,
  recipientProvince: undefined,
  recipientCity: undefined,
  recipientArea: undefined,
  recipientAddress: undefined,
  remark: undefined,
  orderAmount: undefined,
  orderCreateTime: undefined,
  salesChannelSku: undefined,
  productSpecification: undefined,
  itemId: undefined,
  productName: undefined,
  price: undefined,
  quantity: undefined,
  totalAmount: undefined,
  expressTrackingNumber: undefined,
  salesChannel: undefined,
  platformType: undefined,
  platformName: undefined,
  storeName: undefined,
  originConfig: undefined,
  extFieldOne: undefined,
  extFieldTwo: undefined,
  extFieldThree: undefined
})
const formRules = reactive({
  orderNo: [{ required: true, message: '订单号不能为空', trigger: 'blur' }],
  storeName: [{ required: true, message: '店铺名称不能为空', trigger: 'change' }]
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, ids:[],orderBatchId: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('批量修改品规')
  formType.value = '批量修改品规'
  resetForm()
  formData.value.orderBatchId = orderBatchId
  // 修改时，设置数据
  if (ids) {
    formLoading.value = true
    try {
      formData.value.idList = ids
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value
    if (formType.value === '批量修改品规') {
      await MultiPlatformOrderBatchApi.updateBatchMultiPlatformOrder(data)
      message.success(t('common.updateSuccess'))
    } else {
      // await MultiPlatformOrderBatchApi.updateMultiPlatformOrder(data)
      message.success(t('sys.api.errorMessage'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    idList: undefined,
    orderBatchId: undefined,
    orderNo: undefined,
    recipientName: undefined,
    recipientNickname: undefined,
    recipientPhone: undefined,
    recipientProvince: undefined,
    recipientCity: undefined,
    recipientArea: undefined,
    recipientAddress: undefined,
    remark: undefined,
    orderAmount: undefined,
    orderCreateTime: undefined,
    salesChannelSku: undefined,
    productSpecification: undefined,
    itemId: undefined,
    productName: undefined,
    price: undefined,
    quantity: undefined,
    totalAmount: undefined,
    expressTrackingNumber: undefined,
    salesChannel: undefined,
    platformType: undefined,
    platformName: undefined,
    storeName: undefined,
    originConfig: undefined,
    extFieldOne: undefined,
    extFieldTwo: undefined,
    extFieldThree: undefined
  }
  formRef.value?.resetFields()
}
</script>
