import Dashboard from "../modules/manager/dashboard/Dashboard";
import WorkflowManagement from "../modules/manager/sale/workFlowManager/WorkflowManagement";
import CustomerManager from "../modules/manager/sale/customerManager/CustomerManager";
import Payment from "../modules/manager/payment/Payment";
import EmployeeOverview from "../modules/manager/overview/EmployeeOverview";
import PaymentManagement from "../modules/manager/overview/PaymentManagement";
import JobPerformance from "../modules/manager/overview/JobPerformance";
import JobsOverview from "../modules/manager/overview/JobsOverview";
import PersonalInfor from "../modules/manager/personal/PersonalInfor";

export const routes = [
    {
        path: "/",
        exact: true,
        role: ["EDITOR"],
        main: () => <Dashboard />,
    },
    {
        path: "/workflow-management",
        exact: true,
        role: ["SALER", "ADMIN"],
        main: () => <WorkflowManagement />,
    },
    {
        path: "/customer-management",
        exact: true,
        role: ["SALER", "ADMIN"],
        main: () => <CustomerManager />,
    },
    {
        path: "/payment",
        exact: true,
        role: ["SALER", "EDITOR"],
        main: () => <Payment />,
    },
    {
        path: "/employee-overview",
        exact: true,
        role: ["ADMIN"],
        main: () => <EmployeeOverview />,
    },
    {
        path: "/payment-management",
        exact: true,
        role: ["ADMIN"],
        main: () => <PaymentManagement />,
    },
    {
        path: "/job-performance",
        exact: true,
        role: ["ADMIN"],
        main: () => <JobPerformance />,
    },
    {
        path: "/jobs-overview",
        exact: true,
        role: ["ADMIN"],
        main: () => <JobsOverview />,
    },
    {
        path: "/perosonal-information",
        exact: true,
        role: ["SALER", "ADMIN", "LEADER_EDITOR", "EDITOR"],
        main: () => <PersonalInfor />,
    },
];
