import request from '@/config/axios'

// 多平台订单处理批次 VO
export interface MultiPlatformOrderBatchVO {
  id: number // 多平台订单文件id
  platformType: number // 平台
  platformName: string // 补充平台名称
  storeName: string // 店铺名称
  fileUrl: string // 文件url
  remark: string // 备注
}

// 批量更新
export interface MultiPlatformOrderPageReqVO {
  idList: number[] // 多平台订单文件id
  productSpecification: string // 品规
  orderBatchId: number // 订单批次
}

// 多平台订单处理批次 API
export const MultiPlatformOrderBatchApi = {
  // 查询多平台订单处理批次分页
  getMultiPlatformOrderBatchPage: async (params: any) => {
    return await request.get({ url: `/gift/multi-platform-order-batch/page`, params })
  },

  // 查询多平台订单处理批次详情
  getMultiPlatformOrderBatch: async (id: number) => {
    return await request.get({ url: `/gift/multi-platform-order-batch/get?id=` + id })
  },

  // 新增多平台订单处理批次
  createMultiPlatformOrderBatch: async (data: MultiPlatformOrderBatchVO) => {
    return await request.post({ url: `/gift/multi-platform-order-batch/create`, data })
  },

  // 修改多平台订单处理批次
  updateMultiPlatformOrderBatch: async (data: MultiPlatformOrderBatchVO) => {
    return await request.put({ url: `/gift/multi-platform-order-batch/update`, data })
  },

  // 删除多平台订单处理批次
  deleteMultiPlatformOrderBatch: async (id: number) => {
    return await request.delete({ url: `/gift/multi-platform-order-batch/delete?id=` + id })
  },

  // 导出多平台订单处理批次 Excel
  exportMultiPlatformOrderBatch: async (params) => {
    return await request.download({ url: `/gift/multi-platform-order-batch/export-excel`, params })
  },

// ==================== 子表（多平台订单） ====================

  // 获得多平台订单分页
  getMultiPlatformOrderPage: async (params) => {
    return await request.get({ url: `/gift/multi-platform-order-batch/multi-platform-order/page`, params })
  },
  // 新增多平台订单
  createMultiPlatformOrder: async (data) => {
    return await request.post({ url: `/gift/multi-platform-order-batch/multi-platform-order/create`, data })
  },

  // 修改多平台订单
  updateMultiPlatformOrder: async (data) => {
    return await request.put({ url: `/gift/multi-platform-order-batch/multi-platform-order/update`, data })
  },

  // 批量修改订单
  updateBatchMultiPlatformOrder: async (data: MultiPlatformOrderPageReqVO) => {
    return await request.put({ url: `/gift/multi-platform-order-batch/multi-platform-order/batchUpdate`, data })
  },

  // 删除多平台订单
  deleteMultiPlatformOrder: async (id: number) => {
    return await request.delete({ url: `/gift/multi-platform-order-batch/multi-platform-order/delete?id=` + id })
  },

  // 获得多平台订单
  getMultiPlatformOrder: async (id: number) => {
    return await request.get({ url: `/gift/multi-platform-order-batch/multi-platform-order/get?id=` + id })
  },

  // 导出多平台订单批次对应的明细 Excel
  exportMultiPlatformOrderBatchDetail: async (params) => {
    return await request.download({ url: `/gift/multi-platform-order-batch/multi-platform-order/export-excel`, params })
  },
}
