import request from '@/config/axios'

// 蟹云系统旧卡查询  在蟹云系统查询不到可以这里查询 VO
export interface HistoryCardRecordVO {
  id: number // ID
  dataSource: string // 数据源 
  cardNo: string // 卡号
  productSpecName: string // 品规名称
  inSpecInternalAllocation: string // 品规内配
  validityPeriodOfCoupon: Date // 卡券有效期
  productSpecValue: string // 品规面值
  cardCreateTime: Date // 卡券创建时间
  cardActivationTime: Date // 卡券激活时间
  cardSalesStatus: string // 卡券销售状态
  appointmentStatus: string // 预约状态
  cardStatus: string // 卡券状态
  cardSalesOrderNo: string // 售卡订单编号
  cardSalesOrderUserName: string // 售卡订单姓名
  cardSalesOrderRemark: string // 售卡订单说明
  consigneeOrderId: string // 提货订单ID
  consigneeOrderUserName: string // 提货订单姓名
  consigneeTime: Date // 提货时间
  appointmentSendingTime: Date // 约发时间
  consignedItemContent: string // 托寄物内容
  expressTrackingNo: string // 快递单号
  expressCompany: string // 快递公司
  consigneePhoneNumber: string // 提货人手机号
  remark: string // 备注
}

// 蟹云系统旧卡查询  在蟹云系统查询不到可以这里查询 API
export const HistoryCardRecordApi = {
  // 查询蟹云系统旧卡查询  在蟹云系统查询不到可以这里查询分页
  getHistoryCardRecordPage: async (params: any) => {
    return await request.get({ url: `/gift/history-card-record/page`, params })
  },

  // 查询蟹云系统旧卡查询  在蟹云系统查询不到可以这里查询详情
  getHistoryCardRecord: async (id: number) => {
    return await request.get({ url: `/gift/history-card-record/get?id=` + id })
  },

  // 新增蟹云系统旧卡查询  在蟹云系统查询不到可以这里查询
  createHistoryCardRecord: async (data: HistoryCardRecordVO) => {
    return await request.post({ url: `/gift/history-card-record/create`, data })
  },

  // 修改蟹云系统旧卡查询  在蟹云系统查询不到可以这里查询
  updateHistoryCardRecord: async (data: HistoryCardRecordVO) => {
    return await request.put({ url: `/gift/history-card-record/update`, data })
  },

  // 删除蟹云系统旧卡查询  在蟹云系统查询不到可以这里查询
  deleteHistoryCardRecord: async (id: number) => {
    return await request.delete({ url: `/gift/history-card-record/delete?id=` + id })
  },

  // 导出蟹云系统旧卡查询  在蟹云系统查询不到可以这里查询 Excel
  exportHistoryCardRecord: async (params) => {
    return await request.download({ url: `/gift/history-card-record/export-excel`, params })
  }
}