# Current Song Widget

## Description

This small project is designed to display the current/last song played based on a profile from Last FM.

## Instalation

To install and run this project in your local you will need two environment variables:

- VITE_API_KEY: This would be the api key Last FM gives to you
- VITE_USER: This is the user you want to get the current song from

After that follow this steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/mshago/current-song-widget.git
   ```
2. Navigate to the project directory:
   ```sh
   cd project
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Run the project:
   ```sh
   npm run dev
   ```

## Usage

Once the project is running, you can access the widget by opening the following URL in your browser:

```
http://localhost:3000
```

The widget will display the current/last song played by the specified user on Last FM.

Here is a screenshot of the widget in action:

![Widget Screenshot](/public/current-song-widget.png)
