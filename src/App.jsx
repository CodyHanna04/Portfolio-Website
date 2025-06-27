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
import PortalHeader from "./components/PortalHeader";
import ProjectStatus from "./pages/ProjectStatus";
import ProposalRequest from "./pages/ProposalRequest";
import ForgotPassword from "./pages/ForgotPassword";
import EditProposal from './pages/EditProposal';
import ViewInvoice from './pages/ViewInvoice';

//Admin Side
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProposals from "./pages/admin/Proposals";
import AdminUsers from "./pages/admin/Users";
import AdminInvoices from "./pages/admin/Invoices";
import AdminSettings from "./pages/admin/Settings";
import GenerateInvoice from "./pages/admin/GenerateInvoice";
import EditInvoice from "./pages/admin/EditInvoice";
import AdminHeader from './components/AdminHeader';
import AdminAmbassadors from './pages/admin/AdminAmbassadors';

//Ambassador Side
import AmbassadorHeader from './components/AmbassadorHeader';
import AmbassadorDashboard from './pages/ambassador/AmbassadorDashboard';
import AmbassadorRegister from './pages/ambassador/AmbassadorRegister';
import AmbassadorEarnings from './pages/ambassador/AmbassadorEarnings';
import AmbassadorProposalSubmission from './pages/ambassador/AmbassadorProposalSubmission';


function App() {
  const location = useLocation();
  const adminPaths = [
  "/admin",
  "/admin/proposals",
  "/admin/users",
  "/admin/invoices",
  "/admin/settings",
  "/admin/ambassadors"
];

  const isAdminRoute = adminPaths.some(path => location.pathname.startsWith(path));

  const ambassadorPaths = [
  "/ambassador",
  "/ambassador/dashboard",
  "/ambassador/submit-proposal",
  "/ambassador/earnings",
];

  const isAmbassadorRoute = ambassadorPaths.some(path => location.pathname.startsWith(path));

  const isPortalRoute = [
    "/login",
    "/register",
    "/client-dashboard",
    "/project-status",
    "/forgot-password",
    "/proposal-request",
    "/register/ambassador"
  ].includes(location.pathname);

  return (
    <div className="bg-gray-900 text-white font-sans">
      {isAdminRoute ? <AdminHeader /> : isPortalRoute ? <PortalHeader /> : isAmbassadorRoute ? <AmbassadorHeader /> : <Header />}
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
        <Route path="/view-invoice/:id" element={<RoleBasedRoute allowedRoles={["client"]}><ViewInvoice /></RoleBasedRoute>} />

        {/* Admin (Protected by role) */}
        <Route path="/admin" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminDashboard /></RoleBasedRoute>}/>
        <Route path="/admin/proposals" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminProposals /></RoleBasedRoute>}/>
        <Route path="/admin/users" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminUsers /></RoleBasedRoute>}/>
        <Route path="/admin/invoices" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminInvoices /></RoleBasedRoute>}/>
        <Route path="/admin/settings" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminSettings /></RoleBasedRoute>}/>
        <Route path="/admin/ambassadors" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminAmbassadors /></RoleBasedRoute>}/>
        <Route path="/admin/generate-invoice/:proposalId" element={<RoleBasedRoute allowedRoles={["admin"]}><GenerateInvoice /></RoleBasedRoute>}/>
        <Route path="/admin/invoices/edit/:invoiceId" element={<RoleBasedRoute allowedRoles={["admin"]}><EditInvoice /></RoleBasedRoute>}/>

        {/* Ambassador Paths */}
        <Route path="/ambassador/dashboard" element={<RoleBasedRoute allowedRoles={["ambassador"]}><AmbassadorDashboard /></RoleBasedRoute>}/>
        <Route path="/ambassador/earnings" element={<RoleBasedRoute allowedRoles={["ambassador"]}><AmbassadorEarnings /></RoleBasedRoute>}/>
        <Route path="/ambassador/submit-proposal" element={<RoleBasedRoute allowedRoles={["ambassador"]}><AmbassadorProposalSubmission /></RoleBasedRoute>}/>
        <Route path="/register/ambassador" element={<AmbassadorRegister />}/>
      </Routes>
    </div>
  );
}

export default App;
