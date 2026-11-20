// Jingle Journeys settings. Edit these, then re-upload the folder.

window.TREESPOTTER_CONFIG = {
  // Supabase: Project Settings > API (or Connect).
  // API_URL is the Project URL, e.g. https://abcdefgh.supabase.co
  // API_KEY is the publishable key (sb_publishable_...) or the legacy anon key (eyJ...).
  // Leave both blank and each phone keeps its own scores.
  API_URL: "https://yfvsqmzbzalvmhburpdl.supabase.co",
  API_KEY: "sb_publishable_7fvwctDR8i1K7RXRZoE06w_YeMcEVM-",

  // Taps before this date are treated as practice and left out of the season table.
  SEASON_START: "2026-12-01",

  // Points per spot.
  POINTS: { tree: 1, wreath: 1 },

  PLAYERS: [
    { id: "belle",    name: "Belle", colour: "#e63946", emoji: "⭐" },
    { id: "emily",    name: "Emily",    colour: "#f4a261", emoji: "❄️" },
    { id: "jessie",   name: "Jessie",   colour: "#9b5de5", emoji: "candycane" },
    { id: "mummy",    name: "Mummy",    colour: "#00bbf9", emoji: "🎁" },
    { id: "daddy",    name: "Daddy",    colour: "#2ec4b6", emoji: "🦌" }
  ],

  PLACES: {
    home: "Home 🏠",
    swgs: "SWGS 🎓",
    broadchalke: "Broad Chalke Primary 🎒",
    office: "Daddy's office 🏢",
    max: "Max 🐴"
  },

  // Each pair is one journey; the app adds the reverse automatically.
  JOURNEYS: [
    ["home", "swgs"],
    ["home", "broadchalke"],
    ["home", "office"],
    ["home", "max"]
  ]
};
