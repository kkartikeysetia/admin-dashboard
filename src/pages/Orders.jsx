import React, { useState, useMemo, useEffect } from "react";
import { ordersData } from "../data/dummy";

/* ────────────────────────────── Re-usable sub-components */
const StatCard = ({ label, value, icon, iconBg, iconColor }) => (
  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-600 text-sm">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
      <div className={`${iconBg} p-3 rounded-xl`}>
        <span className={`${iconColor} text-2xl`}>{icon}</span>
      </div>
    </div>
  </div>
);

const PageButton = ({ children, active, disabled, onClick }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-3 py-2 rounded-lg transition-colors duration-200 select-none ${
      disabled
        ? "opacity-50 cursor-not-allowed border border-slate-200 text-slate-600"
        : active
        ? "bg-indigo-600 text-white"
        : "border border-slate-200 text-slate-600 hover:bg-white"
    }`}
  >
    {children}
  </button>
);

const Orders = () => {
  /* ───────────────────────────────── State */
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("OrderDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  /* ─────────────────────────────── Helpers */
  const statusColors = {
    canceled: "bg-red-100 text-red-800 border-red-200",
    complete: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };

  // Reset to first page whenever search or status changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Filter + sort data in-memory
  const filteredAndSortedData = useMemo(() => {
    let filtered = ordersData.filter((order) => {
      const searchFields = [
        order.CustomerName || "",
        order.OrderItems || "",
        order.OrderID?.toString() || "",
        order.Status || "",
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch = searchFields.includes(searchTerm.toLowerCase());
      const orderStatus = (order.Status || "").toLowerCase();
      const matchesStatus =
        statusFilter === "All" || orderStatus === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      let aValue = a[sortBy] ?? "";
      let bValue = b[sortBy] ?? "";

      switch (sortBy) {
        case "TotalAmount":
          aValue = parseFloat(a.TotalAmount || 0);
          bValue = parseFloat(b.TotalAmount || 0);
          break;
        case "OrderDate":
          aValue = new Date(a.OrderDate || 0);
          bValue = new Date(b.OrderDate || 0);
          break;
        case "Status":
          aValue = (a.Status || "").toLowerCase();
          bValue = (b.Status || "").toLowerCase();
          break;
        default:
          aValue = aValue.toString().toLowerCase();
          bValue = bValue.toString().toLowerCase();
      }

      if (sortOrder === "asc") return aValue > bValue ? 1 : -1;
      return aValue < bValue ? 1 : -1;
    });

    return filtered;
  }, [searchTerm, statusFilter, sortBy, sortOrder]);

  /* 📄 Pagination */
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  /* ────────────────────────────── Actions */
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleDelete = (order) => {
    if (
      window.confirm(`Are you sure you want to delete order ${order.OrderID}?`)
    ) {
      alert(`Order ${order.OrderID} deleted (demo action).`);
    }
  };

  /** 📤 Export visible data to CSV */
  const exportToCSV = () => {
    const headers = [
      "OrderID",
      "CustomerName",
      "OrderItems",
      "OrderDate",
      "Status",
      "TotalAmount",
      "Location",
    ];
    const rows = filteredAndSortedData.map((o) => [
      o.OrderID,
      o.CustomerName,
      o.OrderItems,
      o.OrderDate,
      o.Status,
      o.TotalAmount,
      o.Location,
    ]);
    const csvContent = [headers, ...rows]
      .map((r) => r.map((c) => `"${c ?? ""}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `orders_${new Date().toISOString()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  /* ────────────────────────────────── UI */
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Orders Management
                </h1>
                <p className="text-slate-600 mt-2">
                  Manage and track all your orders in one place
                </p>
              </div>
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <span className="text-xl">+</span> New Order
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <StatCard
                label="Total Orders"
                value={ordersData.length}
                icon="📦"
                iconBg="bg-indigo-100"
                iconColor="text-indigo-600"
              />
              <StatCard
                label="Revenue"
                value={
                  "$" +
                  ordersData
                    .reduce((sum, o) => sum + parseFloat(o.TotalAmount || 0), 0)
                    .toFixed(2)
                }
                icon="💰"
                iconBg="bg-green-100"
                iconColor="text-green-600"
              />
              <StatCard
                label="Customers"
                value={new Set(ordersData.map((o) => o.CustomerName)).size}
                icon="👥"
                iconBg="bg-purple-100"
                iconColor="text-purple-600"
              />
              <StatCard
                label="Avg Order"
                value={
                  "$" +
                  (
                    ordersData.reduce(
                      (sum, o) => sum + parseFloat(o.TotalAmount || 0),
                      0
                    ) / ordersData.length
                  ).toFixed(2)
                }
                icon="📊"
                iconBg="bg-orange-100"
                iconColor="text-orange-600"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 shadow-lg">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {/* Search */}
                <div className="relative w-full sm:w-80">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                    🔍
                  </span>
                  <input
                    type="text"
                    placeholder="Search orders, customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 bg-white/50 backdrop-blur-sm w-full"
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl px-4 py-3 pr-10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 cursor-pointer"
                  >
                    <option value="All">All Status</option>
                    <option value="canceled">Canceled</option>
                    <option value="complete">Complete</option>
                    <option value="pending">Pending</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">
                    ▼
                  </span>
                </div>
              </div>

              {/* Export */}
              <div className="flex gap-3">
                <button
                  onClick={exportToCSV}
                  className="bg-white/50 backdrop-blur-sm border border-slate-200 px-4 py-3 rounded-xl hover:bg-white/80 transition-all duration-300 flex items-center gap-2"
                >
                  <span className="text-lg">📥</span> Export
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <tr>
                    {[
                      { key: "OrderID", label: "Order ID" },
                      { key: "CustomerName", label: "Customer" },
                      { key: "OrderItems", label: "Product" },
                      { key: "Status", label: "Status" },
                      { key: "TotalAmount", label: "Amount" },
                    ].map((col) => (
                      <th
                        key={col.key}
                        className="text-left py-4 px-6 font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors duration-200 select-none"
                        onClick={() => handleSort(col.key)}
                      >
                        <span className="flex items-center gap-1">
                          {col.label}
                          {sortBy === col.key && (
                            <span className="text-xs">
                              {sortOrder === "asc" ? "▲" : "▼"}
                            </span>
                          )}
                        </span>
                      </th>
                    ))}
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">
                      Location
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((order) => (
                    <tr
                      key={order.OrderID}
                      className="border-b border-slate-100 hover:bg-white/80 transition-all duration-200 group"
                    >
                      <td className="py-4 px-6">
                        <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded-lg">
                          {order.OrderID}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {order.CustomerName.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-800">
                            {order.CustomerName}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              order.ProductImage ||
                              `https://picsum.photos/seed/${order.OrderID}/40/40`
                            }
                            alt={order.OrderItems}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                          />
                          <span className="text-slate-700">
                            {order.OrderItems}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            statusColors[order.Status.toLowerCase()] ||
                            "bg-gray-100 text-gray-800 border-gray-200"
                          }`}
                        >
                          {order.Status}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-800">
                        ${parseFloat(order.TotalAmount || 0).toFixed(2)}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600">
                        📍 {order.Location}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => handleView(order)}
                            className="p-2 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-blue-600 text-sm"
                            title="View"
                          >
                            👁️
                          </button>
                          <button
                            onClick={() => {
                              alert(`Edit order ${order.OrderID}`);
                            }}
                            className="p-2 hover:bg-green-100 rounded-lg transition-colors duration-200 text-green-600 text-sm"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(order)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors duration-200 text-red-600 text-sm"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredAndSortedData.length
                  )}{" "}
                  of {filteredAndSortedData.length} results
                </div>
                <div className="flex items-center gap-2">
                  <PageButton
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    Previous
                  </PageButton>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      if (totalPages <= 7) return true;
                      if (page === 1 || page === totalPages) return true;
                      if (Math.abs(page - currentPage) <= 1) return true;
                      if (currentPage <= 3 && page <= 5) return true;
                      if (
                        currentPage >= totalPages - 2 &&
                        page >= totalPages - 4
                      )
                        return true;
                      return false;
                    })
                    .map((page, idx, arr) => (
                      <React.Fragment key={page}>
                        {idx > 0 && page - arr[idx - 1] > 1 && (
                          <span className="px-1">…</span>
                        )}
                        <PageButton
                          active={currentPage === page}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </PageButton>
                      </React.Fragment>
                    ))}
                  <PageButton
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                  >
                    Next
                  </PageButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                Order Details
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={
                    selectedOrder.ProductImage ||
                    `https://picsum.photos/seed/${selectedOrder.OrderID}/64/64`
                  }
                  alt={selectedOrder.OrderItems}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-semibold text-slate-800">
                    {selectedOrder.OrderItems}
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Order #{selectedOrder.OrderID}
                  </p>
                </div>
              </div>
              <div className="border-t pt-4 space-y-3">
                {[
                  ["Customer", selectedOrder.CustomerName],
                  ["Amount", `$${selectedOrder.TotalAmount}`],
                  ["Location", selectedOrder.Location],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-slate-600">{label}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Status:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      statusColors[selectedOrder.Status.toLowerCase()] ||
                      "bg-gray-100 text-gray-800 border-gray-200"
                    }`}
                  >
                    {selectedOrder.Status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  alert(`Edit order ${selectedOrder.OrderID}`);
                  setShowModal(false);
                }}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Edit Order
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;
