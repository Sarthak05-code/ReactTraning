import React from "react";
import { useState } from "react";

const MOCK_DATA = [
  { id: "1", name: "Documents", type: "folder", parentId: null },
  { id: "2", name: "Images", type: "folder", parentId: null },
  { id: "3", name: "resume.pdf", type: "file", size: "1.2 MB", parentId: null },
  { id: "4", name: "Work", type: "folder", parentId: "1" },
  { id: "5", name: "Personal", type: "folder", parentId: "1" },
  { id: "6", name: "taxes.pdf", type: "file", size: "840 KB", parentId: "1" },
  { id: "7", name: "Project_Alpha.docx", type: "file", size: "2.1 MB", parentId: "4" },
  { id: "8", name: "vacation.jpg", type: "file", size: "4.2 MB", parentId: "2" },
];

export default function App() {
  const [items, setItems] = useState(MOCK_DATA);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [previewFile, setPreviewFile] = useState(null);
  const [draggedItemId, setDraggedItem] = useState(null);
  
  // NEW: Theme state ('default' or 'hacker')
  const [theme, setTheme] = useState("default");
  const isHacker = theme === "hacker";

  const handleAddItem = (type) => {
    const name = prompt(`Enter ${type} name:`);
    if (!name) return;

    const newItem = {
      id: Date.now().toString(),
      name: type === "file" && !name.includes(".") ? `${name}.txt` : name,
      type: type,
      parentId: currentFolderId,
      ...(type === "file" && { size: "0 kb" }),
    };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (id, e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm("Are you sure you wanna delete this item?");
    if (!confirmDelete) return;

    setItems(items.filter((item) => item.id !== id));
  };

  const currentItems = items.filter((item) => {
    if (searchQuery.trim() !== "") {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return item.parentId === currentFolderId;
  });

  const handleDropOnFolder = (targetFolderId, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedItemId || draggedItemId === targetFolderId) {
      setDraggedItem(null);
      return;
    }

    setItems(items.map(item => {
      if (item.id === draggedItemId) {
        return { ...item, parentId: targetFolderId };
      }
      return item;
    }));
    setDraggedItem(null);
  }

  const buildBreadCrumbs = () => {
    const crumbs = [];
    let currentId = currentFolderId;

    while (currentId !== null) {
      const folder = items.find((item) => item.id === currentId);
      if (folder) {
        crumbs.unshift(folder);
        currentId = folder.parentId;
      } else {
        break;
      }
    }
    return crumbs;
  };
  const breadcrumbs = buildBreadCrumbs();

  return (
    <div className={`flex h-screen w-screen overflow-hidden font-cascadia transition-colors duration-300 ${
      isHacker ? "bg-zinc-950 text-green-500" : "bg-gray-50 text-gray-800"
    }`}>
      
      {/* ASIDE / SIDEBAR */}
      <aside className={`w-64 flex flex-col justify-between border-r transition-colors duration-300 ${
        isHacker ? "bg-black border-green-900/50" : "bg-white border-gray-200"
      }`}>
        <div className="p-6">
          <div className={`text-xl font-bold mb-8 flex items-center gap-2 ${
            isHacker ? "text-green-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.5)]" : "text-blue-600"
          }`}>
            <span className="text-2xl">{isHacker ? "📟" : "📁"}</span> {isHacker ? "ROOT_FS//" : "CloudDrive"}
          </div>
          <nav className="space-y-2">
            <a
              href="#"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all ${
                isHacker 
                  ? "bg-green-950/40 text-green-400 border border-green-800/60" 
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              <span>{isHacker ? "🖳" : "🏠"}</span> My Drive
            </a>
            <a
              href="#"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                isHacker ? "text-green-600 hover:bg-green-950/20 hover:text-green-400" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>🕒</span> Recent
            </a>
            <a
              href="#"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                isHacker ? "text-green-600 hover:bg-green-950/20 hover:text-green-400" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>🗑️</span> Trash
            </a>
          </nav>
        </div>
        <div className={`p-4 border-t text-sm ${
          isHacker ? "border-green-900/30 text-green-700" : "border-gray-100 text-gray-500"
        }`}>
          SYS_STG : 12.5 gb / 15 gb
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER */}
        <header className={`h-16 border-b flex items-center justify-between px-8 transition-colors duration-300 ${
          isHacker ? "bg-black border-green-900/50" : "bg-white border-gray-200"
        }`}>
          <div className="w-96">
            <input
              type="text"
              placeholder={isHacker ? "grep_file_system..." : "Search file name..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-all text-sm ${
                isHacker 
                  ? "bg-zinc-900 border-green-900 text-green-400 focus:border-green-500 placeholder-green-800" 
                  : "bg-gray-100 border-transparent focus:border-blue-500 focus:bg-white"
              }`}
            />
          </div>
          
          <div className="flex items-center gap-2">
            {/* THE THEME TOGGLE BUTTON */}
            <button
              onClick={() => setTheme(isHacker ? "default" : "hacker")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all mr-2 ${
                isHacker 
                  ? "bg-zinc-900 text-green-400 border border-green-700 hover:bg-green-950/50" 
                  : "bg-gray-800 text-white hover:bg-gray-900"
              }`}
            >
              {isHacker ? "🌐 Light Mode" : "🥷 Hacker Mode"}
            </button>

            <button
              onClick={() => handleAddItem("folder")}
              className={`px-3 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-1 ${
                isHacker ? "bg-green-900/40 text-green-400 hover:bg-green-800/50 border border-green-700" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              + Mkdir
            </button>
            <button
              onClick={() => handleAddItem("file")}
              className={`px-3 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-1 ${
                isHacker ? "bg-zinc-900 text-green-500 hover:bg-zinc-800 border border-green-900" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              + Touch
            </button>
          </div>
        </header>

        {/* MAIN BODY */}
        <main className="flex-1 overflow-y-auto p-8">
          
          {/* BREADCRUMBS */}
          <div className={`flex items-center gap-2 text-sm mb-6 font-medium h-6 ${isHacker ? "text-green-700" : "text-gray-500"}`}>
            {searchQuery.trim() !== "" ? (
              <span className="italic">
                query_results_for: "{searchQuery}"...
              </span>
            ) : (
              <>
                <span
                  className={`cursor-pointer transition-colors ${isHacker ? "hover:text-green-400" : "hover:text-blue-600"}`}
                  onClick={() => setCurrentFolderId(null)}
                >
                  root
                </span>

                {breadcrumbs.map((crumb) => (
                  <React.Fragment key={crumb.id}>
                    <span>/</span>
                    <span
                      className={`cursor-pointer transition-colors last:cursor-default ${
                        isHacker 
                          ? "hover:text-green-400 last:text-green-400" 
                          : "hover:text-blue-600 last:text-gray-900 last:hover:text-gray-900"
                      }`}
                      onClick={() => setCurrentFolderId(crumb.id)}
                    >
                      {crumb.name}
                    </span>
                  </React.Fragment>
                ))}
              </>
            )}
          </div>

          {/* GRID */}
          {currentItems.length === 0 ? (
            <div className={`text-center py-12 text-sm ${isHacker ? "text-green-800" : "text-gray-400"}`}>
              {isHacker ? "⚡ [EMPTY_DIRECTORY]" : "📁 This folder is empty."}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => setDraggedItem(item.id)}
                  onDragEnd={() => setDraggedItem(null)}

                  onDragOver={(e) => {
                    if (item.type === "folder") {
                      e.preventDefault();
                    }
                  }}
                  onDrop={(e) => {
                    if (item.type === 'folder') {
                      handleDropOnFolder(item.id, e);
                    }
                  }}
                  onClick={() => {
                    if (item.type === "folder") {
                      setCurrentFolderId(item.id);
                    } else {
                      setPreviewFile(item);
                    }
                  } }
                >
                  <FileCard item={item} onDelete={handleDeleteItem} isHacker={isHacker} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <PreviewModal file={previewFile} onClose={() => setPreviewFile(null)} isHacker={isHacker}></PreviewModal>
    </div>
  );
}

// Pass isHacker to the FileCard to handle its internal styles
function FileCard({ item, onDelete, isHacker }) {
  const isFolder = item.type === "folder";

  return (
    <div className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between h-32 group ${
      isHacker 
        ? "bg-zinc-900/60 border-green-950 hover:border-green-500 hover:shadow-[0_0_10px_rgba(34,197,94,0.15)] text-green-400" 
        : "bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 text-gray-900"
    }`}>
      <div className="flex justify-between items-start">
        <span className="text-3xl select-none">
          {isFolder ? (isHacker ? "📂" : "📁") : (isHacker ? "🖺" : "📄")}
        </span>

        <button
          onClick={(e) => onDelete(item.id, e)}
          className={`opacity-0 group-hover:opacity-100 transition-opacity font-bold text-lg px-1.5 rounded ${
            isHacker ? "text-green-700 hover:text-red-500 hover:bg-red-950/30" : "text-gray-400 hover:text-red-600 hover:bg-gray-100"
          }`}
          title="rm -rf"
        >
          ✕
        </button>
      </div>

      <div>
        <h3 className="font-medium truncate" title={item.name}>
          {item.name}
        </h3>
        <p className={`text-xs mt-0.5 ${isHacker ? "text-green-700" : "text-gray-400"}`}>
          {isFolder ? "dir" : item.size}
        </p>
      </div>
    </div>
  );
}

function PreviewModal({ file, onClose, isHacker }) {
  if (!file) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Modal Card */}
      <div className={`w-full max-w-lg rounded-xl border p-6 shadow-2xl transition-all ${
        isHacker 
          ? "bg-zinc-950 border-green-500 text-green-400 font-cascadia shadow-[0_0_20px_rgba(34,197,94,0.3)]" 
          : "bg-white border-gray-200 text-gray-900"
      }`}>
        
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4 border-current/10">
          <h2 className="font-bold text-lg truncate flex items-center gap-2">
            <span>📄</span> {isHacker ? `cat_${file.name}` : file.name}
          </h2>
          <button 
            onClick={onClose}
            className={`font-bold text-sm px-2 py-1 rounded transition-colors ${
              isHacker ? "hover:bg-green-950 hover:text-red-400" : "hover:bg-gray-100 text-gray-500 hover:text-gray-800"
            }`}
          >
            [ESC/CLOSE]
          </button>
        </div>

        {/* Modal Body / Mock Content */}
        <div className={`p-4 rounded-lg border text-sm min-h-32 font-mono mb-4 ${
          isHacker ? "bg-black border-green-900/60 text-green-500" : "bg-gray-50 border-gray-100 text-gray-600"
        }`}>
          <p className="mb-2 font-bold opacity-70">// FILE_METADATA_PROPERTIES</p>
          <p>ID        : {file.id}</p>
          <p>SIZE      : {file.size || "0 KB"}</p>
          <p>LOCATION  : root/{file.parentId || ""}</p>
          <hr className="my-3 border-current/10" />
          <p className="italic opacity-80">
            {isHacker 
              ? "⚡ [ENCRYPTED_STREAM_DATA_HIDDEN] // Permission granted to read file matrix descriptor logs."
              : "Preview content generation complete. No virus or corrupted headers detected inside this container."}
          </p>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isHacker 
                ? "bg-green-900/30 border border-green-500 hover:bg-green-800/40 text-green-400" 
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}