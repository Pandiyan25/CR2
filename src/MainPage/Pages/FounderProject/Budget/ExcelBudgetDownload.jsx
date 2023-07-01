const HEADER_ROW = [
    {
        value: 'Main Expense Head',
        fontWeight: 'bold'
    },
    {
        value: 'Sub Expense Head',
        fontWeight: 'bold'
    },

    // {
    //     value: 'Units/Quantity',
    //     fontWeight: 'bold'
    // },
    {
        value: 'Expense Frequency in Days',
        fontWeight: 'bold'
    },
    {
        value: 'Expense per Cycle',
        fontWeight: 'bold'
    },
    // {
    //     value: 'No. Of Expense Cycle',
    //     fontWeight: 'bold'
    // },
    {
        value: 'Life time Budget',
        fontWeight: 'bold'
    },
    {
        value: 'Actual Expense Till Date',
        fontWeight: 'bold'
    },
    // {
    //     value: 'Balance Budget',
    //     fontWeight: 'bold'
    // },
    {
        value: 'Start Date',
        fontWeight: 'bold'
    },
    {
        value: 'End Date',
        fontWeight: 'bold'
    },
    {
        value: 'Status',
        fontWeight: 'bold'
    },
    // {
    //     value: 'Time Task',
    //     fontWeight: 'bold'
    // }
]

const DATA_ROW_1 = [
    // "Name"
    {
        type: String,
        value: 'Main Expense Head'
    },
    {
        type: String,
        value: 'Sub Expense Head'
    },

    {
        type: Number,
        value: 1000
    },

    {
        type: Number,
        value: 1
    },
    {
        type: Number,
        value: 100
    },
    {
        type: Number,
        value: 10
    },



    // "Date of Birth"
    {
        type: Date,

        value: new Date(),
        format: 'mm/dd/yyyy'
    },
    {
        type: Date,

        value: new Date(),
        format: 'mm/dd/yyyy'
    },
    // "Cost"
    {
        type: String,
        value: "Initial"
    },


]


export const Downloaddata = [
    HEADER_ROW,
    DATA_ROW_1,

]