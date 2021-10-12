import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Settings from './pages/Settings';
import InvoiceTemplate from "./pages/InvoiceTemplate";
import Support from './pages/Support';
import Developers from "./pages/Developers";
import ContactUs from "./pages/ContactUs";
import SignUp from './pages/SignUp';
import Marketing from "./pages/Marketing";
import Consulting from "./pages/Consulting";
import OnBoarding from "./pages/OnBoarding";
import ProductCatalog from "./pages/ProductCatalog";
import BusinessCustomers from "./pages/BusinessCustomers";
import OpenTicket from "./pages/support/OpenTicket";
import Invoices from "./pages/Invoices";
import JourneyDesigner from "./pages/JourneyDesigner";
import ApiSettings from "./pages/ApiSettings";
import Reports from "./pages/Reports";
import TicketProfile from "./pages/support/TicketProfile";
import NewInvoice from "./pages/invoices/NewInvoice";
import NewProduct from "./pages/product-catalog/NewProduct";

function App() {
  return (
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/settings' component={Settings} />
          <Route path='/api-settings' component={ApiSettings} />
          <Route path='/invoice-template' component={InvoiceTemplate} />
          <Route path='/support' component={Support} />
          <Route path='/developers' component={Developers} />
          <Route path='/contact-us' component={ContactUs} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/marketing' component={Marketing} />
          <Route path='/consulting' component={Consulting} />
          <Route path='/reports' component={Reports} />
          <Route path='/invoices' component={Invoices} />
          <Route path='/open-ticket' component={OpenTicket} />
          <Route path='/new-invoice' component={NewInvoice} />
          <Route path='/business-customers' component={BusinessCustomers} />
          <Route path='/product-catalog' component={ProductCatalog} />
          <Route path='/new-product' component={NewProduct} />
          <Route path='/journey-designer' component={JourneyDesigner} />
          <Route path='/onboarding' component={OnBoarding} />
          <Route path='/ticket-profile/:id' component={TicketProfile} />
        </Switch>
      </Router>
  );
}

export default App;
