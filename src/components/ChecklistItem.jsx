import "./ChecklistItem.css";

const ChecklistItem = ({ item, onToggle, onRename, onDelete }) => {
  return (
    <div className="checklist-item">
      <div className="item-left">
        <input
          type="checkbox"
          checked={item.status === true}
          onChange={onToggle}
        />
        <span className={item.status ? "done" : ""}>{item.name}</span>
      </div>
      <div className="item-actions">
        <button className="rename-btn" onClick={onRename}>
          Rename
        </button>
        <button className="delete-btn" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ChecklistItem;
