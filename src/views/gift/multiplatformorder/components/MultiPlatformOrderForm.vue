<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="订单号" prop="orderNo">
        <el-input v-model="formData.orderNo" placeholder="请输入订单号" />
      </el-form-item>
      <el-form-item label="收件人姓名" prop="recipientName">
        <el-input v-model="formData.recipientName" placeholder="请输入收件人姓名" />
      </el-form-item>
      <el-form-item label="收件人昵称" prop="recipientNickname">
        <el-input v-model="formData.recipientNickname" placeholder="请输入收件人昵称" />
      </el-form-item>
      <el-form-item label="收件人电话" prop="recipientPhone">
        <el-input v-model="formData.recipientPhone" placeholder="请输入收件人电话" />
      </el-form-item>
      <el-form-item label="收件省" prop="recipientProvince">
        <el-input v-model="formData.recipientProvince" placeholder="请输入收件省" />
      </el-form-item>
      <el-form-item label="收件市" prop="recipientCity">
        <el-input v-model="formData.recipientCity" placeholder="请输入收件市" />
      </el-form-item>
      <el-form-item label="收件区" prop="recipientArea">
        <el-input v-model="formData.recipientArea" placeholder="请输入收件区" />
      </el-form-item>
      <el-form-item label="收件人地址" prop="recipientAddress">
        <el-input v-model="formData.recipientAddress" placeholder="请输入收件人地址" />
      </el-form-item>
      <el-form-item label="备注说明" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入备注说明" />
      </el-form-item>
      <el-form-item label="订单金额" prop="orderAmount">
        <el-input v-model="formData.orderAmount" placeholder="请输入订单金额" />
      </el-form-item>
      <el-form-item label="下单时间" prop="orderCreateTime">
        <el-date-picker
          v-model="formData.orderCreateTime"
          type="date"
          value-format="x"
          placeholder="选择下单时间"
        />
      </el-form-item>
      <el-form-item label="销售渠道SKU" prop="salesChannelSku">
        <el-input v-model="formData.salesChannelSku" placeholder="请输入销售渠道SKU" />
      </el-form-item>
      <el-form-item label="品规" prop="productSpecification">
        <el-input v-model="formData.productSpecification" placeholder="请输入品规" />
      </el-form-item>
      <el-form-item label="Item_ID" prop="itemId">
        <el-input v-model="formData.itemId" placeholder="请输入Item_ID" />
      </el-form-item>
      <el-form-item label="产品名称" prop="productName">
        <el-input v-model="formData.productName" placeholder="请输入产品名称" />
      </el-form-item>
      <el-form-item label="单价" prop="price">
        <el-input v-model="formData.price" placeholder="请输入单价" />
      </el-form-item>
      <el-form-item label="数量" prop="quantity">
        <el-input v-model="formData.quantity" placeholder="请输入数量" />
      </el-form-item>
      <el-form-item label="小计" prop="totalAmount">
        <el-input v-model="formData.totalAmount" placeholder="请输入小计" />
      </el-form-item>
      <el-form-item label="快递单号" prop="expressTrackingNumber">
        <el-input v-model="formData.expressTrackingNumber" placeholder="请输入快递单号" />
      </el-form-item>
      <el-form-item label="销售渠道" prop="salesChannel">
        <el-select v-model="formData.salesChannel" placeholder="请选择销售渠道">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.GIFT_STORE_NAME)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="平台" prop="platformType">
        <el-select v-model="formData.platformType" placeholder="请选择平台">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.GIFT_PLATFORM_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="补充平台名称" prop="platformName">
        <el-input v-model="formData.platformName" placeholder="请输入补充平台名称" />
      </el-form-item>
      <el-form-item label="店铺名称" prop="storeName">
        <el-select v-model="formData.storeName" placeholder="请选择店铺名称">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.GIFT_STORE_NAME)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="原始订单数据" prop="originConfig">
        <el-input v-model="formData.originConfig" type="textarea" placeholder="请输入原始订单数据" />
      </el-form-item>
      <el-form-item label="扩展字段1" prop="extFieldOne">
        <el-input v-model="formData.extFieldOne" placeholder="请输入扩展字段1" />
      </el-form-item>
      <el-form-item label="扩展字段2" prop="extFieldTwo">
        <el-input v-model="formData.extFieldTwo" placeholder="请输入扩展字段2" />
      </el-form-item>
      <el-form-item label="扩展字段3" prop="extFieldThree">
        <el-input v-model="formData.extFieldThree" placeholder="请输入扩展字段3" />
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
  id: undefined,
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
  recipientName: [{ required: true, message: '收件人姓名不能为空', trigger: 'blur' }],
  recipientPhone: [{ required: true, message: '收件人电话不能为空', trigger: 'blur' }],
  recipientProvince: [{ required: true, message: '收件省不能为空', trigger: 'blur' }],
  recipientCity: [{ required: true, message: '收件市不能为空', trigger: 'blur' }],
  recipientArea: [{ required: true, message: '收件区不能为空', trigger: 'blur' }],
  recipientAddress: [{ required: true, message: '收件人地址不能为空', trigger: 'blur' }],
  orderCreateTime: [{ required: true, message: '下单时间不能为空', trigger: 'blur' }],
  platformType: [{ required: true, message: '平台不能为空', trigger: 'change' }],
  storeName: [{ required: true, message: '店铺名称不能为空', trigger: 'change' }]
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number, orderBatchId: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  formData.value.orderBatchId = orderBatchId
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await MultiPlatformOrderBatchApi.getMultiPlatformOrder(id)
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
    if (formType.value === 'create') {
      await MultiPlatformOrderBatchApi.createMultiPlatformOrder(data)
      message.success(t('common.createSuccess'))
    } else {
      await MultiPlatformOrderBatchApi.updateMultiPlatformOrder(data)
      message.success(t('common.updateSuccess'))
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
    id: undefined,
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
