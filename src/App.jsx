// App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './pages/Header';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Project1 from "./pages/Project1";
import Project2 from "./pages/Project2";
import Project3 from "./pages/Project3";
import Project4 from "./pages/Project4";
//Cody Codes LLC. Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientDashboard from "./pages/ClientDashboard";
import RoleBasedRoute from "./auth/RoleBasedRoute";
import PortalHeader from "./pages/PortalHeader";
import ProjectStatus from "./pages/ProjectStatus";
import ProposalRequest from "./pages/ProposalRequest";
import ForgotPassword from "./pages/ForgotPassword";
import EditProposal from './pages/EditProposal';

//Admin Side
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProposals from "./pages/admin/Proposals";
import AdminUsers from "./pages/admin/Users";
import AdminInvoices from "./pages/admin/Invoices";
import AdminSettings from "./pages/admin/Settings";
import GenerateInvoice from "./pages/admin/GenerateInvoice";
import EditInvoice from "./pages/admin/EditInvoice";
import AdminHeader from './pages/AdminHeader';



function App() {
  const location = useLocation();
  const adminPaths = [
  "/admin",
  "/admin/proposals",
  "/admin/users",
  "/admin/invoices",
  "/admin/settings",
];

  const isAdminRoute = adminPaths.some(path => location.pathname.startsWith(path));
  const isPortalRoute = [
    "/login",
    "/register",
    "/client-dashboard",
    "/project-status",
    "/forgot-password",
    "/proposal-request",
  ].includes(location.pathname);

  return (
    <div className="bg-gray-900 text-white font-sans">
      {isAdminRoute ? <AdminHeader /> : isPortalRoute ? <PortalHeader /> : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project1" element={<Project1 />} />
        <Route path="/project2" element={<Project2 />} />
        <Route path="/project3" element={<Project3 />} />
        <Route path="/project4" element={<Project4 />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/client-dashboard"
          element={
            <RoleBasedRoute allowedRoles={["client"]}>
              <ClientDashboard />
            </RoleBasedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/project-status" element={<RoleBasedRoute allowedRoles={["client"]}><ProjectStatus /></RoleBasedRoute>} />
        <Route path="/proposal-request" element={<RoleBasedRoute allowedRoles={["client"]}><ProposalRequest /></RoleBasedRoute>} />
        <Route path="/edit-proposal/:id" element={<RoleBasedRoute allowedRoles={["client"]}><EditProposal /></RoleBasedRoute>} />

        {/* Admin (Protected by role) */}
        <Route path="/admin" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminDashboard /></RoleBasedRoute>}/>
        <Route path="/admin/proposals" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminProposals /></RoleBasedRoute>}/>
        <Route path="/admin/users" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminUsers /></RoleBasedRoute>}/>
        <Route path="/admin/invoices" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminInvoices /></RoleBasedRoute>}/>
        <Route path="/admin/settings" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminSettings /></RoleBasedRoute>}/>
        <Route path="/admin/generate-invoice/:proposalId" element={<RoleBasedRoute allowedRoles={["admin"]}><GenerateInvoice /></RoleBasedRoute>}/>
        <Route path="/admin/invoices/edit/:invoiceId" element={<RoleBasedRoute allowedRoles={["admin"]}><EditInvoice /></RoleBasedRoute>}/>
      </Routes>
    </div>
  );
}

export default App;
