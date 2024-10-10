{
  description = "my project description";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
          config.android_sdk.accept_license = true;
        };
      in
      {
        devShells.default =
          with pkgs;
          mkShell {
            name = "Devshell";

            buildInputs = [
              nodejs_20
              android-studio
              jdk17
              watchman
              ninja
              android-tools
            ];

            shellHook = ''
              export ANDROID_HOME="$HOME/Android";
              echo "ANDROID_HOME is $ANDROID_HOME"
              export PATH="$ANDROID_HOME/emulator:$PATH";
              export PATH="$ANDROID_HOME/platform-tools:$PATH";
              adb devices
	      echo "Remeber to install android sdk to ~/Android"
            '';
          };

      }
    );
}
