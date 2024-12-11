<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="数据源 " prop="dataSource">
        <el-checkbox-group v-model="formData.dataSource">
          <el-checkbox
            v-for="dict in getStrDictOptions(DICT_TYPE.XY_OLD_CARD_BELONG_SYS)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="卡号" prop="cardNo">
        <el-input v-model="formData.cardNo" placeholder="请输入卡号" />
      </el-form-item>
      <el-form-item label="品规名称" prop="productSpecName">
        <el-input v-model="formData.productSpecName" placeholder="请输入品规名称" />
      </el-form-item>
      <el-form-item label="品规内配" prop="inSpecInternalAllocation">
        <el-input v-model="formData.inSpecInternalAllocation" placeholder="请输入品规内配" />
      </el-form-item>
      <el-form-item label="卡券有效期" prop="validityPeriodOfCoupon">
        <el-date-picker
          v-model="formData.validityPeriodOfCoupon"
          type="date"
          value-format="x"
          placeholder="选择卡券有效期"
        />
      </el-form-item>
      <el-form-item label="品规面值" prop="productSpecValue">
        <el-input v-model="formData.productSpecValue" placeholder="请输入品规面值" />
      </el-form-item>
      <el-form-item label="卡券创建时间" prop="cardCreateTime">
        <el-date-picker
          v-model="formData.cardCreateTime"
          type="date"
          value-format="x"
          placeholder="选择卡券创建时间"
        />
      </el-form-item>
      <el-form-item label="卡券激活时间" prop="cardActivationTime">
        <el-date-picker
          v-model="formData.cardActivationTime"
          type="date"
          value-format="x"
          placeholder="选择卡券激活时间"
        />
      </el-form-item>
      <el-form-item label="卡券销售状态" prop="cardSalesStatus">
        <el-radio-group v-model="formData.cardSalesStatus">
          <el-radio
            v-for="dict in getStrDictOptions(DICT_TYPE.CARD_SALES_STATUS)"
            :key="dict.value"
            :label="dict.value"
          >
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="预约状态" prop="appointmentStatus">
        <el-radio-group v-model="formData.appointmentStatus">
          <el-radio
            v-for="dict in getStrDictOptions(DICT_TYPE.APPOINTMENT_STATUS)"
            :key="dict.value"
            :label="dict.value"
          >
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="卡券状态" prop="cardStatus">
        <el-checkbox-group v-model="formData.cardStatus">
          <el-checkbox
            v-for="dict in getStrDictOptions(DICT_TYPE.CARD_STATUS)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="售卡订单编号" prop="cardSalesOrderNo">
        <el-input v-model="formData.cardSalesOrderNo" placeholder="请输入售卡订单编号" />
      </el-form-item>
      <el-form-item label="售卡订单姓名" prop="cardSalesOrderUserName">
        <el-input v-model="formData.cardSalesOrderUserName" placeholder="请输入售卡订单姓名" />
      </el-form-item>
      <el-form-item label="售卡订单说明" prop="cardSalesOrderRemark">
        <el-input v-model="formData.cardSalesOrderRemark" placeholder="请输入售卡订单说明" />
      </el-form-item>
      <el-form-item label="提货订单ID" prop="consigneeOrderId">
        <el-input v-model="formData.consigneeOrderId" placeholder="请输入提货订单ID" />
      </el-form-item>
      <el-form-item label="提货订单姓名" prop="consigneeOrderUserName">
        <el-input v-model="formData.consigneeOrderUserName" placeholder="请输入提货订单姓名" />
      </el-form-item>
      <el-form-item label="提货时间" prop="consigneeTime">
        <el-date-picker
          v-model="formData.consigneeTime"
          type="date"
          value-format="x"
          placeholder="选择提货时间"
        />
      </el-form-item>
      <el-form-item label="约发时间" prop="appointmentSendingTime">
        <el-date-picker
          v-model="formData.appointmentSendingTime"
          type="date"
          value-format="x"
          placeholder="选择约发时间"
        />
      </el-form-item>
      <el-form-item label="托寄物内容" prop="consignedItemContent">
        <Editor v-model="formData.consignedItemContent" height="150px" />
      </el-form-item>
      <el-form-item label="快递单号" prop="expressTrackingNo">
        <el-input v-model="formData.expressTrackingNo" placeholder="请输入快递单号" />
      </el-form-item>
      <el-form-item label="快递公司" prop="expressCompany">
        <el-input v-model="formData.expressCompany" placeholder="请输入快递公司" />
      </el-form-item>
      <el-form-item label="提货人手机号" prop="consigneePhoneNumber">
        <el-input v-model="formData.consigneePhoneNumber" placeholder="请输入提货人手机号" />
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
import { getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import { HistoryCardRecordApi, HistoryCardRecordVO } from '@/api/gift/historycardrecord'

/** 蟹云系统旧卡查询  在蟹云系统查询不到可以这里查询 表单 */
defineOptions({ name: 'HistoryCardRecordForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  dataSource: [],
  cardNo: undefined,
  productSpecName: undefined,
  inSpecInternalAllocation: undefined,
  validityPeriodOfCoupon: undefined,
  productSpecValue: undefined,
  cardCreateTime: undefined,
  cardActivationTime: undefined,
  cardSalesStatus: undefined,
  appointmentStatus: undefined,
  cardStatus: [],
  cardSalesOrderNo: undefined,
  cardSalesOrderUserName: undefined,
  cardSalesOrderRemark: undefined,
  consigneeOrderId: undefined,
  consigneeOrderUserName: undefined,
  consigneeTime: undefined,
  appointmentSendingTime: undefined,
  consignedItemContent: undefined,
  expressTrackingNo: undefined,
  expressCompany: undefined,
  consigneePhoneNumber: undefined,
  remark: undefined
})
const formRules = reactive({
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
      formData.value = await HistoryCardRecordApi.getHistoryCardRecord(id)
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
    const data = formData.value as unknown as HistoryCardRecordVO
    if (formType.value === 'create') {
      await HistoryCardRecordApi.createHistoryCardRecord(data)
      message.success(t('common.createSuccess'))
    } else {
      await HistoryCardRecordApi.updateHistoryCardRecord(data)
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
    dataSource: [],
    cardNo: undefined,
    productSpecName: undefined,
    inSpecInternalAllocation: undefined,
    validityPeriodOfCoupon: undefined,
    productSpecValue: undefined,
    cardCreateTime: undefined,
    cardActivationTime: undefined,
    cardSalesStatus: undefined,
    appointmentStatus: undefined,
    cardStatus: [],
    cardSalesOrderNo: undefined,
    cardSalesOrderUserName: undefined,
    cardSalesOrderRemark: undefined,
    consigneeOrderId: undefined,
    consigneeOrderUserName: undefined,
    consigneeTime: undefined,
    appointmentSendingTime: undefined,
    consignedItemContent: undefined,
    expressTrackingNo: undefined,
    expressCompany: undefined,
    consigneePhoneNumber: undefined,
    remark: undefined
  }
  formRef.value?.resetFields()
}
</script>
