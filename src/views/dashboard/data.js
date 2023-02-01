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
            title: '本年计划(元)'
        },
        {
            key: 'revenue',
            title: '本月完成(元)'
        },
        {
            key: 'revenueTotal',
            title: '本年完成(元)'
        },
        {
            key: 'revenueCompRateYear',
            title: '完成率(%)'
        },
        {
            key: 'revenueCompRateTb',
            title: '同比增长(%)'
        },
        {
            key: 'remark',
            title: '修改说明'
        }
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
            title: '本年计划(元)'
        },
        {
            key: 'profit',
            title: '本月完成(元)'
        },
        {
            key: 'profitTotal',
            title: '本年完成(元)'
        },
        {
            key: 'profitCompRateYear',
            title: '完成率(%)'
        },
        {
            key: 'profitCompRateTb',
            title: '同比增长(%)'
        },
        {
            key: 'remark',
            title: '修改说明'
        }
    ],
}

// 资产负债1
export const assetsAndLiabilitiesJson1 = {
    name: '资产负债',
    data: [
        {
            name: '',
            value: 'zcfz'
        },
        // {
        //     name: '不含水业燃气',
        //     value: 'assetsAndLiabilitiesNotWaterGas'
        // },
    ],
    columns: [
        // {
        //     key: 'name',
        //     title: ''
        // },
        {
            key: 'totalAssetsQm2',
            title: '总资产(元)'
        },
        {
            key: 'netAssetsQm2',
            title: '净资产(元)'
        },
        {
            key: 'liabilitiesQm2',
            title: '负债(元)'
        },
        {
            key: 'totalAssetsQm',
            title: '总资产-含水业燃气(元)'
        },
        {
            key: 'netAssetsQm',
            title: '净资产-含水业燃气(元)'
        },
        {
            key: 'liabilitiesQm',
            title: '负债-含水业燃气(元)'
        },
        {
            key: 'remark',
            title: '修改说明'
        }
    ],
}
// 资产负债2
// export const assetsAndLiabilitiesJson2 = {
//     name: '资产负债',
//     data: [
//         // {
//         //     name: '含水业燃气',
//         //     value: 'assetsAndLiabilitiesWaterGas'
//         // },
//         {
//             name: '不含水业燃气',
//             value: 'assetsAndLiabilitiesNotWaterGas'
//         },
//     ],
//     columns: [
//         {
//             key: 'name',
//             title: ''
//         },
//         {
//             key: 'totalAssetsQm2',
//             title: '总资产'
//         },
//         {
//             key: 'netAssetsQm2',
//             title: '净资产'
//         },
//         {
//             key: 'liabilitiesQm2',
//             title: '负债'
//         },
//         {
//             key: 'remark',
//             title: '修改说明'
//         }
//     ],
// }
// 投资分析
export const investmentAnalysisJson1 = {
    name: '投资分析',
    data: [
        {
            name: '总投资',
            value: 'investmentAnalysisTotalInvestment'
        },
        // {
        //     name: '政投',
        //     value: 'investmentAnalysisPoliticalInvestment'
        // },
        // {
        //     name: '社投',
        //     value: 'investmentAnalysisSocialInvestment'
        // },
        // {
        //     name: '征拆投资',
        //     value: 'investmentAnalysisZctz'
        // },
        // {
        //     name: '股权及金融投资',
        //     value: 'investmentAnalysisGqjjjtz'
        // },
    ],
    columns: [
        {
            key: 'name',
            title: ''
        },
        {
            key: 'investmentPlan',
            title: '本年计划(元)'
        },
        {
            key: 'investmentPlanMom',
            title: '本月完成(元)'
        },
        {
            key: 'investmentTotal',
            title: '本年完成(元)'
        },
        {
            key: 'completionRate',
            title: '完成率(%)'
        },
        {
            key: 'remark',
            title: '修改说明'
        }
    ],
}
export const investmentAnalysisJson2 = {
    name: '投资分析',
    data: [
        // {
        //     name: '总投资',
        //     value: 'investmentAnalysisTotalInvestment'
        // },
        {
            name: '政投',
            value: 'investmentAnalysisPoliticalInvestment'
        },
        {
            name: '社投',
            value: 'investmentAnalysisSocialInvestment'
        },
        {
            name: '征拆投资',
            value: 'investmentAnalysisZctz'
        },
        {
            name: '股权及金融投资',
            value: 'investmentAnalysisGqjjjtz'
        },
    ],
    columns: [
        {
            key: 'name',
            title: ''
        },
        {
            key: 'planMoneyYear',
            title: '本年计划(元)'
        },
        // {
        //     key: 'investmentPlanMom',
        //     title: '本月完成(元)'
        // },
        {
            key: 'totalMoneyYear',
            title: '本年完成(元)'
        },
        {
            key: 'complRate',
            title: '完成率(%)'
        },
        {
            key: 'remark',
            title: '修改说明'
        }
    ],
}