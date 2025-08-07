import React from 'react';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
 currency: 'BDT'

});

const OrderTable = ({ data, onAction }) => {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Pending Orders</h2>
        </div> */}

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="px-5 py-3">#</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Buyer</th>
                <th className="px-5 py-3">Qty</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data?.map((order, index) => {
                // const isCat = order.Type === 'Cat';
                // const name = isCat ? order.catName.trim().split(/\s+/).slice(0, 15).join(' ') + '...' : order.foodName;
                // const brand = isCat ? order.catBreed.trim().split(/\s+/).slice(0, 15).join(' ') + '...' : order.foodBand;
const isCat = order.Type === 'Cat';

  const name = isCat
    ? `${(order.catName || '').trim().split(/\s+/).slice(0, 15).join(' ')}...`
    : `${(order.foodName || '').trim().split(/\s+/).slice(0, 15).join(' ')}...`;

  const brand = isCat
    ? `${(order.catBreed || '').trim().split(/\s+/).slice(0, 15).join(' ')}...`
    : `${(order.foodBand || '').trim().split(/\s+/).slice(0, 15).join(' ')}...`;

                return (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-3">{index + 1}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                          order.Type === 'Cat'
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-pink-100 text-pink-700'
                        }`}
                      >
                        {order.Type}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-medium text-gray-800">{name}</div>
                      <div className="text-xs text-gray-500">{brand}</div>
                    </td>
                    <td className="px-5 py-3">{order.buyer}</td>
                    <td className="px-5 py-3">{order.quantity}</td>
                    <td className="px-5 py-3">{currency.format(order.singlepicePrice)}</td>
                    <td className="px-5 py-3">{currency.format(order.totalAmount)}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : order.status === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center flex space-x-2">
                      <button
                        onClick={() => onAction(order._id, 'approved')}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200 rounded-full"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onAction(order._id, 'rejected')}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 rounded-full"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                );
              })}
              {data?.length === 0 && (
                <tr>
                  <td colSpan="9" className="px-5 py-6 text-center text-gray-400">
                    No pending orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
