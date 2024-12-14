<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
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
      <el-form-item label="文件url" prop="fileUrl">
        <UploadFile v-model="formData.fileUrl" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入备注" />
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
import { MultiPlatformOrderBatchApi, MultiPlatformOrderBatchVO } from '@/api/gift/multiplatformorder'

/** 多平台订单处理批次 表单 */
defineOptions({ name: 'MultiPlatformOrderBatchForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  platformType: undefined,
  platformName: undefined,
  storeName: undefined,
  fileUrl: undefined,
  remark: undefined
})
const formRules = reactive({
  platformType: [{ required: true, message: '平台不能为空', trigger: 'change' }],
  storeName: [{ required: true, message: '店铺名称不能为空', trigger: 'change' }],
  fileUrl: [{ required: true, message: '文件url不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await MultiPlatformOrderBatchApi.getMultiPlatformOrderBatch(id)
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
    const data = formData.value as unknown as MultiPlatformOrderBatchVO
    if (formType.value === 'create') {
      await MultiPlatformOrderBatchApi.createMultiPlatformOrderBatch(data)
      message.success(t('common.createSuccess'))
    } else {
      await MultiPlatformOrderBatchApi.updateMultiPlatformOrderBatch(data)
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
    platformType: undefined,
    platformName: undefined,
    storeName: undefined,
    fileUrl: undefined,
    remark: undefined
  }
  formRef.value?.resetFields()
}
</script>
