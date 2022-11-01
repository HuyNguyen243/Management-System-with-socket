export const navButtons = [
    {
        name_image : "pie",
        isRederect : false,
        route: "",
        name: "Tổng quan",
        navChild :[ 
            {
                name: "Tổng quan công việc",
                isRederect : true,
                route: "/jobs-overview"
            },
            {
                name: "Tổng quan nhân viên",
                isRederect : true,
                route: "/employee-overview"
            },
            {
                name: "Quản lý thanh toán",
                isRederect : true,
                route: "/payment-management"
            },
            {
                name: "Hiệu suất công việc",
                isRederect : true,
                route: "/job-performance"
            },
        ]
    },
    {
        name_image : "work",
        isRederect : false,
        route: "",
        name: "Công việc",
        navChild :[ 
            {
                name: "Danh sách công việc",
                isRederect : true,
                route: "/"
            },
        ]
    },
    {
        name_image : "shopping-bag",
        isRederect : false,
        route: "",
        name: "Sales",
        navChild :[ 
            {
                name: "Quản lý công việc",
                isRederect : true,
                route: "/workflow-management"
            },
            {
                name: "Quản lý khách hàng",
                isRederect : true,
                route: "/customer-management"
            },
        ]
    },
    {
        name_image : "money",
        isRederect : false,
        route: "",
        name: "Thanh toán",
        navChild :[ 
            {
                name: "Tiến trình thanh toán",
                isRederect : true,
                route: "/payment"
            },
        ]
    },
    {
        name_image : "setting",
        isRederect : false,
        route: "",
        name: "Cài đặt",
        navChild: null,
        haveModal: true
    },
]