export const operatingJson = {
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
}
// 净利润
export const netProfitJson = {
    name: '净利润',
    data: [
        {
            name: '集团合计',
            value: 'netProfitGroupTotal'
        },
        {
            name: '城市开发',
            value: 'netProfitUrbanDevelopment'
        },
        {
            name: '城市建设',
            value: 'netProfitUrbanConstruction'
        },
        {
            name: '城市运营',
            value: 'netProfitCityOperation'
        },
        {
            name: '产融投资',
            value: 'netProfitInvestment'
        },
    ],
    columns: [
        {
            key: 'name',
            title: ''
        },
        {
            key: 'profitPlanYear',
            title: '本年计划(亿元)'
        },
        {
            key: 'profit',
            title: '本月完成(亿元)'
        },
        {
            key: 'profitTotal',
            title: '本年完成(亿元)'
        },
        {
            key: 'profitCompRateYear',
            title: '完成率'
        },
        
    ],
}

// 资产负债1
export const assetsAndLiabilitiesJson1 = {
    name: '资产负债',
    data: [
        {
            name: '含水业燃气',
            value: 'assetsAndLiabilitiesWaterGas'
        },
        // {
        //     name: '不含水业燃气',
        //     value: 'assetsAndLiabilitiesNotWaterGas'
        // },
    ],
    columns: [
        {
            key: 'name',
            title: ''
        },
        {
            key: 'totalAssetsQm',
            title: '总资产'
        },
        {
            key: 'netAssetsQm',
            title: '净资产'
        },
        {
            key: 'liabilitiesQm',
            title: '负债'
        },
    ],
}
// 资产负债2
export const assetsAndLiabilitiesJson2 = {
    name: '资产负债',
    data: [
        // {
        //     name: '含水业燃气',
        //     value: 'assetsAndLiabilitiesWaterGas'
        // },
        {
            name: '不含水业燃气',
            value: 'assetsAndLiabilitiesNotWaterGas'
        },
    ],
    columns: [
        {
            key: 'name',
            title: ''
        },
        {
            key: 'totalAssetsQm2',
            title: '总资产'
        },
        {
            key: 'netAssetsQm2',
            title: '净资产'
        },
        {
            key: 'liabilitiesQm2',
            title: '负债'
        },
    ],
}
// 投资分析
export const investmentAnalysisJson = {
    name: '投资分析',
    data: [
        {
            name: '总投资',
            value: 'InvestmentAnalysisTotalInvestment'
        },
        {
            name: '政投',
            value: 'InvestmentAnalysisPoliticalInvestment'
        },
        {
            name: '社投',
            value: 'InvestmentAnalysisSocialInvestment'
        },
        {
            name: '政拆投资',
            value: 'InvestmentAnalysisZctz'
        },
        {
            name: '股权及金融投资',
            value: 'InvestmentAnalysisGqjjjtz'
        },
    ],
    columns: [
        {
            key: 'name',
            title: ''
        },
        {
            key: 'totalAssetsQm',
            title: '总资产'
        },
        {
            key: 'netAssetsQc',
            title: '净资产'
        },
        {
            key: 'liabilitiesQc',
            title: '负债'
        },
    ],
}