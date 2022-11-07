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
        path: '/',
        exact: true,
        main: ()=> <Dashboard />
    },
    {
        path: '/workflow-management',
        exact: true,
        main: ()=> <WorkflowManagement />
    },
    {
        path: '/customer-management',
        exact: true,
        main: ()=> <CustomerManager />
    },
    {
        path: '/payment',
        exact: true,
        main: ()=> <Payment />
    },
    {
        path: '/employee-overview',
        exact: true,
        main: ()=> <EmployeeOverview />
    },
    {
        path: '/payment-management',
        exact: true,
        main: ()=> <PaymentManagement />
    },
    {
        path: '/job-performance',
        exact: true,
        main: ()=> <JobPerformance />
    },
    {
        path: '/jobs-overview',
        exact: true,
        main: ()=> <JobsOverview />
    },
    {
        path: '/perosonal-information',
        exact: true,
        main: ()=> <PersonalInfor />
    },
];