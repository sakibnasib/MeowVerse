import React from 'react';

const TableAdmin = ({ data, page = 1, limit = 10 }) => {
  if (!data || data?.bookings?.length === 0) {
    return <p className="text-center text-gray-600">No orders found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th>#</th>
            <th>Type</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.bookings.map((order, index) => (
            <tr key={order._id}>
              <td>{(page - 1) * limit + index + 1}</td>
              <td>{order.Type}</td>
              <td>
                {order.Type === 'Cat' ? (
                  <>
                    <div className="font-medium">{order.catName}</div>
                    <div className="text-xs text-gray-500">{order.catBreed}</div>
                  </>
                ) : (
                  <>
                    <div className="font-medium">{order.foodName}</div>
                    <div className="text-xs text-gray-500">{order.foodBand}</div>
                  </>
                )}
              </td>
              <td>{order.quantity}</td>
              <td>৳{order.totalAmount}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    order.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-600'
                      : order.status === 'Approved'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAdmin;
