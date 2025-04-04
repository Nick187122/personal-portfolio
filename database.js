// Database simulation using localStorage
class Database {
  constructor() {
    this.tables = {
      messages: [],
      projects: [],
      visitors: [],
    };
    this.loadFromStorage();
  }

  // Initialize with sample data if empty
  initSampleData() {
    if (this.tables.projects.length === 0) {
      this.tables.projects = [
        {
          id: 1,
          title: "Secure Auth System",
          description:
            "Multi-factor authentication with biometric verification",
          technologies: "Python, Flask, JWT",
          github_url: "https://github.com/oyiolon/secure-auth",
          category: "cybersecurity",
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          title: "Vulnerability Scanner",
          description: "Automated web application vulnerability scanner",
          technologies: "Python, Security",
          github_url: "https://github.com/oyiolon/vuln-scanner",
          category: "cybersecurity",
          created_at: new Date().toISOString(),
        },
      ];
      this.saveToStorage();
    }
  }

  // CRUD Operations
  insert(table, data) {
    if (!this.tables[table]) {
      this.tables[table] = [];
    }

    const newItem = {
      id: this.generateId(table),
      ...data,
      created_at: new Date().toISOString(),
    };

    this.tables[table].push(newItem);
    this.saveToStorage();
    return newItem;
  }

  select(table, conditions = {}) {
    if (!this.tables[table]) return [];

    return this.tables[table].filter((item) => {
      return Object.keys(conditions).every((key) => {
        return item[key] === conditions[key];
      });
    });
  }

  update(table, id, updates) {
    const index = this.tables[table].findIndex((item) => item.id === id);
    if (index !== -1) {
      this.tables[table][index] = {
        ...this.tables[table][index],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  delete(table, id) {
    const initialLength = this.tables[table].length;
    this.tables[table] = this.tables[table].filter((item) => item.id !== id);
    if (initialLength !== this.tables[table].length) {
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Helper methods
  generateId(table) {
    const maxId = this.tables[table].reduce(
      (max, item) => Math.max(max, item.id || 0),
      0
    );
    return maxId + 1;
  }

  saveToStorage() {
    localStorage.setItem("portfolio_db", JSON.stringify(this.tables));
  }

  loadFromStorage() {
    const savedData = localStorage.getItem("portfolio_db");
    if (savedData) {
      this.tables = JSON.parse(savedData);
    }
    this.initSampleData();
  }
}

// Create a single database instance
const db = new Database();

// Export functions that mimic MySQL operations
export const mysql = {
  query: (sql, params) => {
    // Simple SQL parser for our needs
    if (sql.startsWith("INSERT INTO")) {
      const table = sql.match(/INSERT INTO (\w+)/)[1];
      return db.insert(table, params);
    } else if (sql.startsWith("SELECT")) {
      const table = sql.match(/FROM (\w+)/)[1];
      const where = sql.match(/WHERE (.*)/);
      const conditions = where ? JSON.parse(where[1].replace(/=/g, ":")) : {};
      return db.select(table, conditions);
    } else if (sql.startsWith("UPDATE")) {
      const table = sql.match(/UPDATE (\w+)/)[1];
      const idMatch = sql.match(/WHERE id = (\d+)/);
      if (!idMatch) return false;
      return db.update(table, parseInt(idMatch[1]), params);
    } else if (sql.startsWith("DELETE")) {
      const table = sql.match(/FROM (\w+)/)[1];
      const idMatch = sql.match(/WHERE id = (\d+)/);
      if (!idMatch) return false;
      return db.delete(table, parseInt(idMatch[1]));
    }
    return null;
  },
};
