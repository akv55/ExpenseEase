const menus = [
  "Security",
  "Appearance",
  "Danger Zone",
];

export default function SettingsSidebar({ active, setActive }) {
  const activeButtonRef = (node) => {
    if (!node) return;

    // On mobile, keep the active tab visible.
    // No-op on desktop where we render as a vertical sidebar.
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches) {
      node.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    }
  };

  return (
    <aside className="w-full md:w-72 bg-white p-4 md:p-6 rounded-2xl shadow-sm mb-4 md:mb-0 md:mr-6 h-fit">
      <h2 className="text-lg md:text-xl font-bold text-teal-700 mb-3 md:mb-6">
        Settings
      </h2>

      <ul className="flex md:block gap-2 md:gap-0 overflow-x-auto md:overflow-visible pb-1 md:pb-0 md:space-y-1 snap-x snap-mandatory">
        {menus.map((item) => (
          <li key={item} className="shrink-0 md:shrink snap-start">
            <button
              type="button"
              onClick={() => setActive(item)}
              ref={active === item ? activeButtonRef : undefined}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                ${
                  active === item
                    ? "bg-teal-600 text-white"
                    : "text-gray-700 hover:bg-teal-50"
                }`}
              aria-current={active === item ? "page" : undefined}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
