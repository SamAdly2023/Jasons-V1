
import React, { useState } from 'react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'analytics'>('orders');

  const stats = [
    { label: 'Total Sales', value: '$12,450', trend: '+12%', icon: 'fa-chart-line' },
    { label: 'Active Orders', value: '24', trend: 'Processing', icon: 'fa-box' },
    { label: 'Avg Order Value', value: '$42.50', trend: '-2%', icon: 'fa-wallet' },
  ];

  const recentOrders = [
    { id: '#4501', customer: 'Alice Smith', item: 'Cyberpunk Tee', amount: '$29.99', status: 'Processing' },
    { id: '#4502', customer: 'Bob Jones', item: 'Zen Hoodie', amount: '$45.00', status: 'Shipped' },
    { id: '#4503', customer: 'Charlie Brown', item: 'Neon Tee', amount: '$29.99', status: 'Delivered' },
    { id: '#4504', customer: 'David Wilson', item: 'Abstract Tee', amount: '$29.99', status: 'Pending' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Admin Control</h1>
            <p className="text-gray-500">Managing Fresh Life Style operations.</p>
          </div>
          <div className="mt-6 md:mt-0 flex space-x-2 bg-white p-2 rounded-2xl shadow-sm">
            {(['orders', 'inventory', 'analytics'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl text-sm font-bold uppercase transition-all ${
                  activeTab === tab ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
               <div className="flex justify-between items-start mb-6">
                 <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                    <i className={`fa-solid ${stat.icon} text-gray-800`}></i>
                 </div>
                 <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.includes('+') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                   {stat.trend}
                 </span>
               </div>
               <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">{stat.label}</h3>
               <p className="text-3xl font-black">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-gray-100">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
             <h3 className="text-xl font-black uppercase">Recent Orders</h3>
             <button className="text-sm font-bold text-blue-500 hover:underline">View All Orders</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-[0.2em]">
                  <th className="px-8 py-4">Order ID</th>
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4">Item</th>
                  <th className="px-8 py-4">Amount</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6 font-bold">{order.id}</td>
                    <td className="px-8 py-6">{order.customer}</td>
                    <td className="px-8 py-6">{order.item}</td>
                    <td className="px-8 py-6 font-bold">{order.amount}</td>
                    <td className="px-8 py-6">
                       <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase ${
                         order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                         order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                         order.status === 'Shipped' ? 'bg-purple-100 text-purple-700' :
                         'bg-gray-100 text-gray-700'
                       }`}>
                         {order.status}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                       <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all">
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
