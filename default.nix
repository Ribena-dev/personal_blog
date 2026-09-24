with (import <nixpkgs> {});
let env = bundlerEnv {
    name = "jekyll_env";
    inherit ruby;
    gemfile = ../Gemfile;
    lockfile = ../Gemfile.lock;
    gemset = ../gemset.nix;
  };
in stdenv.mkDerivation {
  name = "devinaa.gs";
  buildInputs = [env bundler ruby];
}
