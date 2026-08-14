{
  flake-utils,
  nixpkgs,
  ...
}:
let
  systems = [
    "aarch64-darwin"
    "x86_64-darwin"
    "aarch64-linux"
    "x86_64-linux"
  ];
in
flake-utils.lib.eachSystem systems (
  system:
  let
    pkgs = import nixpkgs { inherit system; };
    version = "0.147.0-alpha.6.5";
    platform =
      {
        aarch64-darwin = {
          npm = "darwin-arm64";
          hash = "sha256-PrgYLBsvY+EvY6U2BCJ4a3Nb5FvoVnvJde0fBuJHiDw=";
        };
        x86_64-darwin = {
          npm = "darwin-x64";
          hash = "sha256-nes10IrPb5wRghxdxUjuJ1K5iJy7iUdrUpTkFd3S/zI=";
        };
        aarch64-linux = {
          npm = "linux-arm64";
          hash = "sha256-AxH1n1lCt8PF7hXCPvjAVmz3x7S/0zbysRoy3WhHkew=";
        };
        x86_64-linux = {
          npm = "linux-x64";
          hash = "sha256-TNsowLy1oertEXp1jB5z6ZRotACilgsWkJRzACixnFA=";
        };
      }
      .${system};
    src = pkgs.fetchurl {
      url = "https://registry.npmjs.org/@openai/codex/-/codex-${version}-${platform.npm}.tgz";
      hash = platform.hash;
    };
  in
  {
    packages.codex =
      pkgs.runCommand "codex-${version}"
        {
          pname = "codex";
          inherit src version;
        }
        ''
          tar -xzf "$src"
          install -Dm755 package/vendor/*/bin/codex "$out/bin/codex"
        '';
  }
)
