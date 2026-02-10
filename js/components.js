/**
 * UI Components for Japan ARC
 * Handles dynamic rendering of Sidebar and Navbar based on user role.
 */

const NAV_ITEMS = {
    student: [
        { label: 'Dashboard', icon: 'home', href: 'dashboard-student.html', id: 'dashboard' },
        { label: 'My Application', icon: 'document-text', href: 'applications/application-form.html', id: 'application' },
        { label: 'Documents', icon: 'folder', href: 'applications/document-upload.html', id: 'documents' },
        { label: 'Payments', icon: 'credit-card', href: 'payments/payment-plans.html', id: 'payments' },
        { label: 'My Courses', icon: 'academic-cap', href: 'lms/courses.html', id: 'courses' },
        { label: 'Exams', icon: 'pencil-alt', href: 'lms/exams.html', id: 'exams' },
        { label: 'Notifications', icon: 'bell', href: 'notifications/inbox.html', id: 'notifications' },
    ],
    staff: [
        { label: 'Staff Dashboard', icon: 'home', href: 'dashboard-staff.html', id: 'dashboard' },
        { label: 'Applications', icon: 'users', href: 'applications/application-review.html', id: 'applications' },
        { label: 'Document Review', icon: 'clipboard-check', href: 'applications/document-review.html', id: 'doc-review' },
        { label: 'Payments', icon: 'cash', href: 'payments/approvals.html', id: 'payments' },
        { label: 'Tickets', icon: 'ticket', href: 'notifications/tickets.html', id: 'tickets' },
        { label: 'Reports', icon: 'chart-bar', href: 'reports/staff-reports.html', id: 'reports' },
    ],
    teacher: [
        { label: 'Teacher Dashboard', icon: 'home', href: 'dashboard-teacher.html', id: 'dashboard' },
        { label: 'My Classes', icon: 'user-group', href: 'lms/courses.html', id: 'classes' },
        { label: 'Grading', icon: 'beaker', href: 'lms/grading.html', id: 'grading' },
        { label: 'Speaking Tests', icon: 'microphone', href: 'lms/speaking-tests.html', id: 'speaking' },
        { label: 'Reports', icon: 'chart-pie', href: 'reports/teacher-reports.html', id: 'reports' },
    ],
    admin: [
        { label: 'Admin Overview', icon: 'template', href: 'dashboard-admin.html', id: 'dashboard' },
        { label: 'User Management', icon: 'user-add', href: 'settings/roles-permissions.html', id: 'users' },
        { label: 'Finances', icon: 'currency-yen', href: 'payments/reconciliation.html', id: 'finances' },
        { label: 'Audit Logs', icon: 'shield-check', href: 'audit/audit-logs.html', id: 'audit' },
        { label: 'System Settings', icon: 'cog', href: 'settings/system-settings.html', id: 'settings' },
    ]
};

function getIcon(name) {
    // Return SVG paths for Heroicons
    const icons = {
        'home': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>',
        'document-text': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>',
        'folder': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>',
        'credit-card': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>',
        'academic-cap': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>',
        'pencil-alt': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>',
        'bell': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>',
        'users': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>',
        'clipboard-check': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>',
        'cash': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>',
        'ticket': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>',
        'chart-bar': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"/>',
        'user-group': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>',
        'beaker': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>',
        'microphone': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>',
        'chart-pie': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/>',
        'template': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>',
        'user-add': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>',
        'currency-yen': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8l3 5m0 0l3-5m-3 5v4m-3-5h6m-6 3h6m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>',
        'shield-check': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>',
        'cog': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>'
    };
    return icons[name] || '';
}

/**
 * Renders the sidebar
 * @param {string} role - 'student', 'staff', 'teacher', 'admin'
 * @param {string} activePageId - ID of active nav item
 * @param {string} basePath - Relative path to root, e.g. './' or '../'
 */
function renderSidebar(role, activePageId, basePath = './') {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (!sidebarContainer) return;

    const items = NAV_ITEMS[role] || [];

    let html = `
        <div class="h-full flex flex-col bg-brand-900 text-white w-64 shadow-xl transition-all duration-300 transform fixed md:relative z-30" id="sidebar">
            <div class="flex items-center gap-3 h-20 px-6 border-b border-brand-800 bg-brand-900">
                <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center text-brand-900 font-bold text-sm">JA</div>
                <span class="font-jp font-bold text-lg tracking-wide">JAPAN ARC</span>
            </div>

            <div class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                ${items.map(item => {
        const isActive = item.id === activePageId;
        const href = basePath + item.href;

        return `
                    <a href="${href}" class="flex items-center gap-3 px-3 py-3 rounded-lg transition-all group ${isActive ? 'bg-brand-700 text-white shadow-md' : 'text-brand-100 hover:bg-brand-800 hover:text-white'}">
                        <svg class="h-6 w-6 ${isActive ? 'text-accent-500' : 'text-brand-300 group-hover:text-white'} transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            ${getIcon(item.icon)}
                        </svg>
                        <span class="font-medium text-sm">${item.label}</span>
                    </a>
                    `;
    }).join('')}
            </div>

            <div class="p-4 border-t border-brand-800 bg-brand-900">
                 <button onclick="auth.logout()" class="flex items-center gap-3 w-full px-3 py-2 text-brand-200 hover:text-white hover:bg-brand-800 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span class="text-sm font-medium">Log out</span>
                </button>
            </div>
        </div>
    `;

    sidebarContainer.innerHTML = html;
}

function renderTopbar(user, title) {
    const topbarContainer = document.getElementById('topbar-container');
    if (!topbarContainer) return;

    topbarContainer.innerHTML = `
        <header class="bg-white shadow-sm h-20 flex items-center justify-between px-6 lg:px-8 z-10 relative">
            <div class="flex items-center">
                <button id="mobile-menu-btn" class="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <h1 class="text-xl font-bold text-gray-800 ml-4 md:ml-0">${title}</h1>
            </div>

            <div class="flex items-center gap-4 lg:gap-6">
                <!-- Notifications -->
                <button class="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none">
                    <span class="absolute top-2 right-2 w-2 h-2 bg-accent-500 rounded-full animate-pulse border border-white"></span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>

                <!-- Profile Dropdown -->
                <div class="relative ml-3 group">
                    <div>
                        <button type="button" class="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                            <span class="sr-only">Open user menu</span>
                            <img class="h-9 w-9 rounded-full object-cover border border-gray-200" src="${user.avatar}" alt="">
                            <div class="hidden ml-3 md:block text-left">
                                <p class="text-sm font-medium text-gray-700 group-hover:text-brand-600 transition-colors">${user.name}</p>
                                <p class="text-xs text-gray-500 uppercase tracking-wider">${user.role}</p>
                            </div>
                            <svg class="hidden md:block ml-2 w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    `;

    // Mobile menu toggle
    const btn = document.getElementById('mobile-menu-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('-translate-x-full');
            sidebar.classList.toggle('absolute');
            sidebar.classList.toggle('h-screen');
        });
    }
}
