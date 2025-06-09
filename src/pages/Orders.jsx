import React, { useState, useMemo, useEffect } from "react";
import { ordersData } from "../data/dummy";

/* ────────────────────────────── Re-usable sub-components */
// StatCard updated to match the pastel theme from the image
const StatCard = ({ label, value, icon, iconBg, iconColor, cardBg }) => (
  <div
    className={`${cardBg} rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all duration-300`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-600 text-sm font-medium">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
      <div className={`${iconBg} p-3 rounded-full shadow-sm`}>
        <span className={`${iconColor} text-2xl`}>{icon}</span>
      </div>
    </div>
  </div>
);

const PageButton = ({ children, active, disabled, onClick }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-3 py-2 rounded-lg transition-all duration-200 select-none ${
      disabled
        ? "opacity-50 cursor-not-allowed bg-slate-200 text-slate-600"
        : active
        ? "bg-blue-500 text-white shadow-lg"
        : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
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
  // Status colors with pastel theme
  const statusColors = {
    canceled: "bg-red-100 text-red-700 border border-red-200",
    complete: "bg-green-100 text-green-700 border border-green-200",
    pending: "bg-orange-100 text-orange-700 border border-orange-200",
    active: "bg-blue-100 text-blue-700 border border-blue-200",
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
    if (sortBy === field) setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    else {
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
      {/* Main background matching the provided image's light theme */}
      <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header container styled like the image */}
          <div className="bg-blue-100/50 rounded-2xl p-6 mb-8 border border-blue-200/60 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Page</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
              Orders Management
            </h1>
            <p className="text-slate-600">
              Manage and track all your orders in one place
            </p>
          </div>

          {/* Stats Cards with pastel theme from the image */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              label="Total Orders"
              value={ordersData.length}
              icon="📦"
              cardBg="bg-violet-50 border-violet-200"
              iconBg="bg-violet-200"
              iconColor="text-violet-600"
            />
            <StatCard
              label="Revenue"
              value={
                "$" +
                ordersData
                  .reduce((sum, o) => sum + parseFloat(o.TotalAmount || 0), 0)
                  .toLocaleString("en-US", { minimumFractionDigits: 2 })
              }
              icon="💰"
              cardBg="bg-green-50 border-green-200"
              iconBg="bg-green-200"
              iconColor="text-green-600"
            />
            <StatCard
              label="Customers"
              value={new Set(ordersData.map((o) => o.CustomerName)).size}
              icon="👥"
              cardBg="bg-purple-50 border-purple-200"
              iconBg="bg-purple-200"
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
              cardBg="bg-rose-50 border-rose-200"
              iconBg="bg-rose-200"
              iconColor="text-rose-600"
            />
          </div>

          {/* Directory Section in a single white card */}
          <div className="bg-blue-100/50 border-blue-200/60 rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Orders Directory
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Search, edit, and manage order records
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
                  Editable
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                  Searchable
                </span>
              </div>
            </div>

            {/* Search and Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between my-6">
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative w-full sm:w-80">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                    🔍
                  </span>
                  <input
                    type="text"
                    placeholder="Search by name, product, status..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200/50 transition-all duration-300 bg-white w-full placeholder-slate-400"
                  />
                </div>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none bg-white border border-slate-300 rounded-xl px-4 py-3 pr-10 focus:border-blue-400 focus:ring-2 focus:ring-blue-200/50 transition-all duration-300 cursor-pointer text-slate-700 w-full sm:w-auto"
                  >
                    <option value="All">All Status</option>
                    <option value="canceled">Canceled</option>
                    <option value="complete">Complete</option>
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">
                    ▼
                  </span>
                </div>
              </div>
              <div className="flex gap-3 w-full lg:w-auto">
                <button
                  onClick={exportToCSV}
                  className="bg-white border border-slate-300 px-4 py-3 rounded-xl hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-2 text-slate-700 w-1/2 lg:w-auto"
                >
                  <span className="text-lg">📥</span> Export
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg w-1/2 lg:w-auto">
                  <span className="text-xl">+</span> New Order
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-hidden border border-slate-200 rounded-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
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
                          className="text-left py-3 px-6 font-semibold text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors duration-200"
                          onClick={() => handleSort(col.key)}
                        >
                          <span className="flex items-center gap-1.5">
                            {col.label}
                            {sortBy === col.key && (
                              <span className="text-xs text-blue-600">
                                {sortOrder === "asc" ? "▲" : "▼"}
                              </span>
                            )}
                          </span>
                        </th>
                      ))}
                      <th className="text-left py-3 px-6 font-semibold text-slate-600">
                        Location
                      </th>
                      <th className="text-center py-3 px-6 font-semibold text-slate-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((order) => (
                      <tr
                        key={order.OrderID}
                        className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors duration-200 group"
                      >
                        <td className="py-4 px-6">
                          <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded text-slate-700">
                            #{order.OrderID}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-blue-100 border border-blue-200 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm shadow-sm">
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
                              src={order.ProductImage}
                              alt={order.OrderItems}
                              className="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-sm"
                            />
                            <span className="text-slate-700">
                              {order.OrderItems}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              statusColors[order.Status.toLowerCase()] ||
                              "bg-gray-100 text-gray-700 border border-gray-200"
                            }`}
                          >
                            {order.Status}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-semibold text-slate-800">
                          ${parseFloat(order.TotalAmount || 0).toFixed(2)}
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <span className="text-pink-500">📍</span>
                            {order.Location}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              onClick={() => handleView(order)}
                              title="View"
                              className="p-2 hover:bg-blue-100 rounded-lg text-blue-600"
                            >
                              👁️
                            </button>
                            <button
                              onClick={() =>
                                alert(`Edit order ${order.OrderID}`)
                              }
                              title="Edit"
                              className="p-2 hover:bg-green-100 rounded-lg text-green-600"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDelete(order)}
                              title="Delete"
                              className="p-2 hover:bg-red-100 rounded-lg text-red-600"
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
            </div>

            {/* Pagination Container */}
            <div className="pt-4">
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
                          <span className="px-1 text-slate-500">…</span>
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                Order Details
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl transition-colors duration-200"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedOrder.ProductImage}
                  alt={selectedOrder.OrderItems}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-sm"
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
              <div className="border-t border-slate-200 pt-4 space-y-3">
                {[
                  ["Customer", selectedOrder.CustomerName],
                  ["Amount", `$${selectedOrder.TotalAmount}`],
                  ["Location", selectedOrder.Location],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-slate-600">{label}:</span>
                    <span className="font-medium text-slate-800">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Status:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[selectedOrder.Status.toLowerCase()] ||
                      "bg-gray-100 text-gray-700 border border-gray-200"
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
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-200 shadow-md"
              >
                Edit Order
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-white hover:bg-slate-50 text-slate-700 py-2 px-4 rounded-lg transition-all duration-200 border border-slate-200"
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
