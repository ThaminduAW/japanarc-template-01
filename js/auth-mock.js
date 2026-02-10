/**
 * Mock Authentication System for Japan ARC
 * Simulates role-based access control and user sessions.
 */

const USERS = [
    {
        id: 'std_001',
        name: 'Kenji Sato',
        email: 'student@japanarc.com',
        role: 'student',
        avatar: 'https://ui-avatars.com/api/?name=Kenji+Sato&background=random',
        program: 'Standard Japanese Course',
        status: 'active'
    },
    {
        id: 'stf_001',
        name: 'Sarah staff',
        email: 'staff@japanarc.com',
        role: 'staff',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Staff&background=random',
        department: 'Visa Processing',
        status: 'active'
    },
    {
        id: 'tch_001',
        name: 'Yuki Teacher',
        email: 'teacher@japanarc.com',
        role: 'teacher',
        avatar: 'https://ui-avatars.com/api/?name=Yuki+Teacher&background=random',
        specialty: 'Speaking',
        status: 'active'
    },
    {
        id: 'adm_001',
        name: 'Admin User',
        email: 'admin@japanarc.com',
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=random',
        access: 'full',
        status: 'active'
    }
];

class Auth {
    constructor() {
        this.user = JSON.parse(localStorage.getItem('japanarc_user')) || null;
    }

    login(email, password) {
        // Mock login - accepts any password for demo
        const user = USERS.find(u => u.email === email);
        if (user) {
            this.user = user;
            localStorage.setItem('japanarc_user', JSON.stringify(user));
            return { success: true, user: user };
        }
        return { success: false, message: 'Invalid credentials. Try student@japanarc.com' };
    }

    logout() {
        this.user = null;
        localStorage.removeItem('japanarc_user');
        window.location.href = '../index.html';
    }

    isAuthenticated() {
        return !!this.user;
    }

    getUser() {
        return this.user;
    }

    requireAuth(allowedRoles = []) {
        if (!this.isAuthenticated()) {
            window.location.href = '../login.html';
            return;
        }

        if (allowedRoles.length > 0 && !allowedRoles.includes(this.user.role)) {
            alert('Unauthorized Access');
            // Redirect to appropriate dashboard based on role
            this.redirectRole(this.user.role);
        }
    }

    redirectRole(role) {
        switch (role) {
            case 'student':
                window.location.href = 'dashboard-student.html';
                break;
            case 'staff':
                window.location.href = 'dashboard-staff.html';
                break;
            case 'teacher':
                window.location.href = 'dashboard-teacher.html';
                break;
            case 'admin':
                window.location.href = 'dashboard-admin.html';
                break;
            default:
                window.location.href = 'index.html';
        }
    }
}

const auth = new Auth();
