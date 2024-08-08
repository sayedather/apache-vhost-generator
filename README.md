
# Apache Virtual Host Generator

This Node.js web application allows you to easily generate and enable Apache2 virtual hosts through a simple graphical user interface (GUI). The app provides a form where you can specify the domain name, document root, and port for the virtual host. Once submitted, the application creates the necessary Apache configuration file, enables the site, and reloads the Apache service.

## Features

- **GUI Interface**: User-friendly form to input domain name, document root, and port.
- **Automatic Configuration**: Generates and enables Apache virtual host configuration files.
- **Supports Custom Ports**: Allows you to define custom ports for virtual hosts.

## Prerequisites

- **Node.js**: Version 14 or higher.
- **Apache2**: Installed and configured to accept new virtual host configurations.
- **Sudo Access**: The app needs permission to write files to `/etc/apache2/sites-available/` and reload Apache.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sayedather/apache-vhost-generator.git
   cd apache-vhost-generator
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Run the application:**

   To run the application with the necessary privileges, use:

   ```bash
   sudo node app.js
   ```

4. **Access the Web Interface:**

   Open your web browser and navigate to `http://localhost:3001`.

## Usage

1. **Fill out the form**:
    - **Domain Name**: Enter the domain name for the virtual host (e.g., `example.com`).
    - **Document Root**: Enter the path to the document root for the site (e.g., `/var/www/html/example`).
    - **Port**: Specify the port number to run the virtual host on (e.g., `80`).

2. **Submit the form**:
    - After filling out the form, click the "Generate Virtual Host" button. 
    - The application will create a virtual host configuration file in `/etc/apache2/sites-available/`, enable the site, and reload Apache.

3. **Access your new virtual host**:
    - Your virtual host will be available at the specified domain and port.

## File Structure

- **app.js**: Main application file handling routing and virtual host generation.
- **views/index.ejs**: The EJS template rendering the form interface.

## Troubleshooting

- **Permission Errors**: Make sure you run the application with `sudo` to allow it to write to system directories and reload Apache.
- **Port Conflicts**: Ensure the port you specify is not in use by another service. (uUse this [Random Port Number Generator](https://it-tools.tech/random-port-generator))
- **Apache Configuration Issues**: Verify that Apache is correctly installed and configured on your system. You may need to manually check the configuration files in `/etc/apache2/sites-available/`.

## Security Considerations

- **Access Control**: Ensure the web app is not publicly accessible, as it provides direct access to your Apache configuration.
- **Input Validation**: The app does basic input validation, but further hardening may be required for production environments.

## License

This project is licensed under the MIT License.
