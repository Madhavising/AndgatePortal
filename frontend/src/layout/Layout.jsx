import React from 'react';

const Sidebar = () => (
    <aside style={{ width: '220px', background: '#222', color: '#fff', height: '100vh', padding: '1rem' }}>
        <h2>Sidebar</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>Dashboard</li>
            <li>Profile</li>
            <li>Settings</li>
        </ul>
    </aside>
);

const Navbar = () => (
    <nav style={{ height: '60px', background: '#444', color: '#fff', display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Navbar</h1>
    </nav>
);

const Layout = ({ children }) => (
    <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1, padding: '1rem', background: '#f4f4f4' }}>
                {children}
            </main>
        </div>
    </div>
);

export default Layout;
