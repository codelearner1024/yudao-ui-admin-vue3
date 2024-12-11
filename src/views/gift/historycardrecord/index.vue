<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="卡号" prop="cardNo">
        <el-input
          v-model="queryParams.cardNo"
          placeholder="请输入卡号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="品规名称" prop="productSpecName">
        <el-input
          v-model="queryParams.productSpecName"
          placeholder="请输入品规名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="品规内配" prop="inSpecInternalAllocation">
        <el-input
          v-model="queryParams.inSpecInternalAllocation"
          placeholder="请输入品规内配"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="卡券有效期" prop="validityPeriodOfCoupon">
        <el-date-picker
          v-model="queryParams.validityPeriodOfCoupon"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-220px"
        />
      </el-form-item>
      <el-form-item label="品规面值" prop="productSpecValue">
        <el-input
          v-model="queryParams.productSpecValue"
          placeholder="请输入品规面值"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="卡券创建时间" prop="cardCreateTime">
        <el-date-picker
          v-model="queryParams.cardCreateTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-220px"
        />
      </el-form-item>
      <el-form-item label="卡券激活时间" prop="cardActivationTime">
        <el-date-picker
          v-model="queryParams.cardActivationTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-220px"
        />
      </el-form-item>
      <el-form-item label="卡券销售状态" prop="cardSalesStatus">
        <el-select
          v-model="queryParams.cardSalesStatus"
          placeholder="请选择卡券销售状态"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.CARD_SALES_STATUS)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="预约状态" prop="appointmentStatus">
        <el-select
          v-model="queryParams.appointmentStatus"
          placeholder="请选择预约状态"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.APPOINTMENT_STATUS)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="售卡订单编号" prop="cardSalesOrderNo">
        <el-input
          v-model="queryParams.cardSalesOrderNo"
          placeholder="请输入售卡订单编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="售卡订单姓名" prop="cardSalesOrderUserName">
        <el-input
          v-model="queryParams.cardSalesOrderUserName"
          placeholder="请输入售卡订单姓名"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="售卡订单说明" prop="cardSalesOrderRemark">
        <el-input
          v-model="queryParams.cardSalesOrderRemark"
          placeholder="请输入售卡订单说明"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="提货订单ID" prop="consigneeOrderId">
        <el-input
          v-model="queryParams.consigneeOrderId"
          placeholder="请输入提货订单ID"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="提货订单姓名" prop="consigneeOrderUserName">
        <el-input
          v-model="queryParams.consigneeOrderUserName"
          placeholder="请输入提货订单姓名"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="提货时间" prop="consigneeTime">
        <el-date-picker
          v-model="queryParams.consigneeTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-220px"
        />
      </el-form-item>
      <el-form-item label="约发时间" prop="appointmentSendingTime">
        <el-date-picker
          v-model="queryParams.appointmentSendingTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-220px"
        />
      </el-form-item>
      <el-form-item label="快递单号" prop="expressTrackingNo">
        <el-input
          v-model="queryParams.expressTrackingNo"
          placeholder="请输入快递单号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="快递公司" prop="expressCompany">
        <el-input
          v-model="queryParams.expressCompany"
          placeholder="请输入快递公司"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="提货人手机号" prop="consigneePhoneNumber">
        <el-input
          v-model="queryParams.consigneePhoneNumber"
          placeholder="请输入提货人手机号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="queryParams.remark"
          placeholder="请输入备注"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          v-model="queryParams.createTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-220px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
          v-hasPermi="['gift:history-card-record:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['gift:history-card-record:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="数据源 " align="center" prop="dataSource">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.XY_OLD_CARD_BELONG_SYS" :value="scope.row.dataSource" />
        </template>
      </el-table-column>
      <el-table-column label="卡号" align="center" prop="cardNo" />
      <el-table-column label="品规名称" align="center" prop="productSpecName" />
      <el-table-column label="品规内配" align="center" prop="inSpecInternalAllocation" />
      <el-table-column
        label="卡券有效期"
        align="center"
        prop="validityPeriodOfCoupon"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="品规面值" align="center" prop="productSpecValue" />
      <el-table-column
        label="卡券创建时间"
        align="center"
        prop="cardCreateTime"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column
        label="卡券激活时间"
        align="center"
        prop="cardActivationTime"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="卡券销售状态" align="center" prop="cardSalesStatus">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.CARD_SALES_STATUS" :value="scope.row.cardSalesStatus" />
        </template>
      </el-table-column>
      <el-table-column label="预约状态" align="center" prop="appointmentStatus">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.APPOINTMENT_STATUS" :value="scope.row.appointmentStatus" />
        </template>
      </el-table-column>
      <el-table-column label="卡券状态" align="center" prop="cardStatus">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.CARD_STATUS" :value="scope.row.cardStatus" />
        </template>
      </el-table-column>
      <el-table-column label="售卡订单编号" align="center" prop="cardSalesOrderNo" />
      <el-table-column label="售卡订单姓名" align="center" prop="cardSalesOrderUserName" />
      <el-table-column label="售卡订单说明" align="center" prop="cardSalesOrderRemark" />
      <el-table-column label="提货订单ID" align="center" prop="consigneeOrderId" />
      <el-table-column label="提货订单姓名" align="center" prop="consigneeOrderUserName" />
      <el-table-column
        label="提货时间"
        align="center"
        prop="consigneeTime"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="约发时间" align="center" prop="appointmentSendingTime" />
      <el-table-column label="托寄物内容" align="center" prop="consignedItemContent" />
      <el-table-column label="快递单号" align="center" prop="expressTrackingNo" />
      <el-table-column label="快递公司" align="center" prop="expressCompany" />
      <el-table-column label="提货人手机号" align="center" prop="consigneePhoneNumber" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="操作" align="center" min-width="120px">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['gift:history-card-record:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['gift:history-card-record:delete']"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <HistoryCardRecordForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { HistoryCardRecordApi, HistoryCardRecordVO } from '@/api/gift/historycardrecord'
import HistoryCardRecordForm from './HistoryCardRecordForm.vue'

/** 蟹云系统旧卡查询  在蟹云系统查询不到可以这里查询 列表 */
defineOptions({ name: 'HistoryCardRecord' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<HistoryCardRecordVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  dataSource: undefined,
  cardNo: undefined,
  productSpecName: undefined,
  inSpecInternalAllocation: undefined,
  validityPeriodOfCoupon: [],
  productSpecValue: undefined,
  cardCreateTime: [],
  cardActivationTime: [],
  cardSalesStatus: undefined,
  appointmentStatus: undefined,
  cardStatus: undefined,
  cardSalesOrderNo: undefined,
  cardSalesOrderUserName: undefined,
  cardSalesOrderRemark: undefined,
  consigneeOrderId: undefined,
  consigneeOrderUserName: undefined,
  consigneeTime: [],
  appointmentSendingTime: [],
  consignedItemContent: undefined,
  expressTrackingNo: undefined,
  expressCompany: undefined,
  consigneePhoneNumber: undefined,
  remark: undefined,
  createTime: []
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await HistoryCardRecordApi.getHistoryCardRecordPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await HistoryCardRecordApi.deleteHistoryCardRecord(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await HistoryCardRecordApi.exportHistoryCardRecord(queryParams)
    download.excel(data, '蟹云系统旧卡查询  在蟹云系统查询不到可以这里查询.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>
