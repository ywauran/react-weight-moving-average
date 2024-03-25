// Import React and other necessary components
import React from "react";
// Dummy components for demonstration
const Dashboard = () => <div>Dashboard Content</div>;
const Orders = () => <div>Orders Content</div>;
const Services = () => <div>Services Content</div>;
const Settings = () => <div>Settings Content</div>;
const ActiveOrder = () => <div>Active Order Content</div>;
const CompletedOrder = () => <div>Completed Order Content</div>;
const CanceledOrder = () => <div>Canceled Order Content</div>;
const ManageServices = () => <div>Manage Services Content</div>;

const routeData = [
  {
    path: "/dashboard",
    component: Dashboard,
    title: "Dashboard",
  },
  {
    path: "/orders",
    component: Orders,
    title: "Orders",
    children: [
      {
        path: "/orders/active",
        component: ActiveOrder,
        title: "Active Order",
      },
      {
        path: "/orders/completed",
        component: CompletedOrder,
        title: "Completed Order",
      },
      {
        path: "/orders/canceled",
        component: CanceledOrder,
        title: "Canceled Order",
      },
    ],
  },
  {
    path: "/services",
    component: Services,
    title: "Services",
    children: [
      {
        path: "/services/manage",
        component: ManageServices,
        title: "Manage Services",
      },
    ],
  },
  {
    path: "/settings",
    component: Settings,
    title: "Settings",
  },
];

export default routeData;
