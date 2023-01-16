export const data = {
    name: '营收收入',
    data: [
        {
            name: '集团合计',
            value: 'operatingIncomeGroupTotal'
        },
        {
            name: '城市开发',
            value: 'operatingIncomeUrbanDevelopment'
        },
        {
            name: '城市建设',
            value: 'operatingIncomeUrbanConstruction'
        },
        {
            name: '城市运营',
            value: 'operatingIncomeCityOperation'
        },
        {
            name: '产融投资',
            value: 'operatingIncomeInvestment'
        },
    ],
    columns: [
        {
            key: 'name',
            title: ''
        },
        {
            key: 'revenuePlanYear',
            title: '本年计划(亿元)'
        },
        {
            key: 'revenue',
            title: '本月完成(亿元)'
        },
        {
            key: 'revenueTotal',
            title: '本年完成(亿元)'
        },
        {
            key: 'revenueCompRateYear',
            title: '完成率'
        },
        
    ],
    // key: ['revenuePlanYear','revenue','revenueTotal','revenueCompRateYear']
}