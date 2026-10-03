import "./Footer.css";

function Footer() {
	return (
		<footer className="footer">
			<p>&copy; {new Date().getFullYear()} ThreadHive</p>
		</footer>
	);
}

export default Footer;
