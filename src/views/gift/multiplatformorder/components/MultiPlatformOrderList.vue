<template>
  <!-- 列表 -->
  <ContentWrap>
    <el-form-item label="商品名称" prop="productName">
      <el-input
        v-model="queryParams.productName"
        placeholder="请输入商品名称"
        clearable
        @keyup.enter="handleQuery"
        class="!w-240px"
      />
    </el-form-item>
    <el-form-item>
    <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
    <el-button
        type="primary"
        plain
        @click="openDealOrderListForm()"
        v-hasPermi="['gift:multi-platform-order-batch:update']"
      >
        <Icon icon="ep:plus" class="mr-5px" /> 批量修改品规
    </el-button>
    <el-button
      type="primary"
      plain
      @click="openForm('create')"
      v-hasPermi="['gift:multi-platform-order-batch:create']"
    >
      <Icon icon="ep:plus" class="mr-5px" /> 新增
    </el-button>
    </el-form-item>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" :selectable="selectable" width="55" />
      <el-table-column label="多平台订单id" align="center" prop="id" />
       <el-table-column label="订单号" align="center" prop="orderNo" width="270" fixed="left"/>
      <el-table-column label="收件人姓名" align="center" prop="recipientName" />
      <el-table-column label="收件人昵称" align="center" prop="recipientNickname" />
      <el-table-column label="收件人电话" align="center" prop="recipientPhone" width="130"/>
      <el-table-column label="收件省" align="center" prop="recipientProvince" />
      <el-table-column label="收件市" align="center" prop="recipientCity" />
      <el-table-column label="收件区" align="center" prop="recipientArea" />
      <el-table-column label="收件人地址" align="center" prop="recipientAddress" width="450"/>
      <el-table-column label="备注说明" align="center" prop="remark" width="270"/>
      <el-table-column label="订单金额" align="center" prop="orderAmount" />
      <el-table-column
        label="下单时间"
        align="center"
        prop="orderCreateTime"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="销售渠道SKU" align="center" prop="salesChannelSku" />
      <el-table-column label="品规" align="center" prop="productSpecification" width="230"/>
      <el-table-column label="Item_ID" align="center" prop="itemId" />
      <el-table-column label="产品名称" align="center" prop="productName" width="470"/>
      <el-table-column label="单价" align="center" prop="price" />
      <el-table-column label="数量" align="center" prop="quantity" />
      <el-table-column label="小计" align="center" prop="totalAmount" />
      <el-table-column label="快递单号" align="center" prop="expressTrackingNumber" width="170"/>
      <el-table-column label="销售渠道" align="center" prop="salesChannel" width="170">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.GIFT_STORE_NAME" :value="scope.row.salesChannel" />
        </template>
      </el-table-column>
      <el-table-column label="平台" align="center" prop="platformType">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.GIFT_PLATFORM_TYPE" :value="scope.row.platformType" />
        </template>
      </el-table-column>
      <el-table-column label="补充平台名称" align="center" prop="platformName" />
      <el-table-column label="店铺名称" align="center" prop="storeName" width="170">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.GIFT_STORE_NAME" :value="scope.row.storeName" />
        </template>
      </el-table-column>
      <el-table-column label="原始订单数据" align="center" prop="originConfig" />
      <el-table-column label="扩展字段1" align="center" prop="extFieldOne" />
      <el-table-column label="扩展字段2" align="center" prop="extFieldTwo" />
      <el-table-column label="扩展字段3" align="center" prop="extFieldThree" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="操作" align="center" width="130">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['gift:multi-platform-order-batch:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['gift:multi-platform-order-batch:delete']"
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
  <!-- 表单弹窗：批量修改 -->
    <MultiPlatformDealOrderListForm ref="dealListFormRef"/>
    <!-- 表单弹窗：添加/修改 -->
    <MultiPlatformOrderForm ref="formRef" @success="getList" />
</template>
<script setup lang="ts">
import { DICT_TYPE } from '@/utils/dict'
import { dateFormatter } from '@/utils/formatTime'
import { MultiPlatformOrderBatchApi } from '@/api/gift/multiplatformorder'
import MultiPlatformOrderForm from './MultiPlatformOrderForm.vue'

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const props = defineProps<{
  orderBatchId?: number // 订单处理批次号（主表的关联字段）
}>()
const loading = ref(false) // 列表的加载中
const list = ref([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  productName: undefined as unknown,
  orderBatchId: undefined as unknown,
})

/** 监听主表的关联字段的变化，加载对应的子表数据 */
watch(
  () => props.orderBatchId,
  (val: number) => {
    if (!val) {
      return
    }
    queryParams.orderBatchId = val
    handleQuery()
  },
    { immediate: true, deep: true }
)
// 用于存储选中行的数据
const selectedRows = ref([]);
// 处理表格行选择变化事件，更新选中行数据
const handleSelectionChange = (val) => {
  selectedRows.value = val;
};

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await MultiPlatformOrderBatchApi.getMultiPlatformOrderPage(queryParams)
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

/** 添加/修改操作 */
const formRef = ref()
const dealListFormRef = ref()
const openForm = (type: string, id?: number) => {
  if (!props.orderBatchId) {
    message.error('请选择一个多平台订单处理批次')
    return
  }
  formRef.value.open(type, id, props.orderBatchId)
}

/**添加批量处理操作*/
const openDealOrderListForm = () => {
  if (!props.orderBatchId) {
    message.error('请选择一个多平台订单处理批次')
    return
  }
  const selectedIds = selectedRows.value.map(row => row.id);

  dealListFormRef.value.open(selectedIds, props.orderBatchId)
}


/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await MultiPlatformOrderBatchApi.deleteMultiPlatformOrder(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}
</script>
