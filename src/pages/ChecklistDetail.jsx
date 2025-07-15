import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getChecklistItems,
  createChecklistItem,
  updateChecklistItemStatus,
  renameChecklistItem,
  deleteChecklistItem,
} from "../api/checklist";
import ChecklistItem from "../components/ChecklistItem";
import "./ChecklistDetail.css";

const ChecklistDetail = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const fetchItems = async () => {
    try {
      const res = await getChecklistItems(id);
      const normalized = res.data.map(item => ({
        ...item,
        status: item.itemCompletionStatus
      }));
      setItems(normalized);
    } catch {
      alert("Gagal memuat item checklist");
    }
  };

  useEffect(() => {
    fetchItems();
  }, [id]);

  const handleAddItem = async () => {
    if (!newItem.trim()) return;
    try {
      await createChecklistItem(id, newItem);
      setNewItem("");
      fetchItems();
    } catch {
      alert("Gagal menambahkan item");
    }
  };

  const handleToggle = async (itemId) => {
    try {
      await updateChecklistItemStatus(id, itemId);
      fetchItems();
    } catch {
      alert("Gagal mengupdate status");
    }
  };

  const handleRename = async (itemId) => {
    const itemName = prompt("Masukkan nama baru:");
    if (itemName) {
      try {
        await renameChecklistItem(id, itemId, itemName);
        fetchItems();
      } catch {
        alert("Gagal rename item");
      }
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm("Yakin hapus item ini?")) return;
    try {
      await deleteChecklistItem(id, itemId);
      fetchItems();
    } catch {
      alert("Gagal menghapus item");
    }
  };

  return (
    <div className="detail-page">
      <h2>Detail Checklist</h2>

      <div className="add-item">
        <input
          type="text"
          placeholder="Tambah item baru..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={handleAddItem}>Tambah Item</button>
      </div>

      <div className="item-list">
        {items.length > 0 ? (
          items.map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              onToggle={() => handleToggle(item.id)}
              onRename={() => handleRename(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          ))
        ) : (
          <p className="empty-text">Belum ada item</p>
        )}
      </div>
    </div>
  );
};

export default ChecklistDetail;
