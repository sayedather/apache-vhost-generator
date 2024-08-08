const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const PORT = 3001;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Render the form
app.get('/', (req, res) => {
    res.render('index');
});

// Handle form submission
app.post('/generate', (req, res) => {
    const { domain, documentRoot, port } = req.body;

    // Basic validation
    if (!domain || !documentRoot || !port) {
        return res.status(400).send('All fields are required!');
    }

    // Create the virtual host configuration content
    const vhostConfig = `
Listen ${port}
NameVirtualHost *:${port}
<VirtualHost *:${port}>
    ServerAdmin webmaster@${domain}
    ServerName ${domain}
    DocumentRoot ${documentRoot}
    ErrorLog \${APACHE_LOG_DIR}/${domain}_error.log
    CustomLog \${APACHE_LOG_DIR}/${domain}_access.log combined
</VirtualHost>`;

    const vhostFilePath = `/etc/apache2/sites-available/${domain}.conf`;

    // Write the virtual host config file
    fs.writeFile(vhostFilePath, vhostConfig, (err) => {
        if (err) {
            console.error('Error writing config file:', err);
            return res.status(500).send('Failed to write virtual host configuration.');
        }

        // Enable the site and reload Apache
        exec(`sudo a2ensite ${domain}.conf && sudo systemctl reload apache2`, (err, stdout, stderr) => {
            if (err) {
                console.error('Error enabling site or reloading Apache:', err);
                return res.status(500).send('Failed to enable site or reload Apache.');
            }
            res.send(`Virtual host for ${domain} on port ${port} has been created and enabled successfully!`);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
