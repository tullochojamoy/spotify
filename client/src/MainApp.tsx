import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

//Main CSS
import './styles/globals.css'

//Main Pages
import Layout from './components/Layout';
import MainPage from './pages/MainPage'; 
import Home from './pages/home';
import Favourites from './pages/favourites';
import Playlist from './pages/playlists';
import Search from './pages/search';
import Song from './pages/song';
import NotFound from './pages/notFound';
import StripeApp from './components/stripe/stripeApp';

function MainApp(){
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/home" element={<Layout><Home /></Layout>} />
				<Route path="/favourites" element={<Layout><Favourites /></Layout>} />
				<Route path="/playlists" element={<Layout><Playlist /></Layout>} />
				<Route path="/pro" element={<Layout><StripeApp /></Layout>} />
				<Route path="/search" element={<Layout><Search /></Layout>} />
				<Route path="/search/:id" element={<Layout><Search /></Layout>} />
				<Route path="/song/:key" element={<Layout><Song /></Layout>} />
				<Route path="/*" element={<NotFound />} />
				<Route path="/" element={<MainPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default MainApp;