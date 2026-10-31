"""
YSK Family Finance - Git Auto-Updater
Pulls the latest updates from GitHub repository and refreshes the application.
"""

import os
import sys
import subprocess
import json

def find_git():
    # 1. Try standard system git
    try:
        res = subprocess.run(["git", "--version"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if res.returncode == 0:
            return "git"
    except Exception:
        pass

    # 2. Try common GitHub Desktop paths on Windows
    local_app_data = os.environ.get("LOCALAPPDATA", "")
    possible_paths = [
        os.path.join(local_app_data, "GitHubDesktop", "app-3.6.7", "resources", "app", "git", "cmd", "git.exe"),
        os.path.join(local_app_data, "GitHubDesktop", "app-3.6.5", "resources", "app", "git", "cmd", "git.exe"),
        r"C:\Program Files\Git\bin\git.exe",
        r"C:\Program Files\Git\cmd\git.exe"
    ]

    for p in possible_paths:
        if os.path.exists(p):
            return p

    return None

def main():
    print("=" * 60)
    print("  YSK Family Finance - GitHub Auto-Updater")
    print("  ប្រព័ន្ធធ្វើបច្ចុប្បន្នភាពស្វ័យប្រវត្តិតាមរយៈ GitHub")
    print("=" * 60)

    git_bin = find_git()
    if not git_bin:
        print("\n[!] មិនអាចស្វែងរកកម្មវិធី Git ឃើញទេ។")
        print("    Could not locate Git executable on this system.")
        print("    Please install Git or GitHub Desktop: https://desktop.github.com/")
        input("\nPress Enter to exit...")
        return

    print(f"\n[*] Using Git: {git_bin}")

    # Check git status
    try:
        print("[*] កំពុងពិនិត្យមើលកំណែថ្មីពី GitHub (Fetching latest updates)...")
        fetch_res = subprocess.run([git_bin, "fetch"], capture_output=True, text=True)
        
        print("[*] កំពុងធ្វើបច្ចុប្បន្នភាពកូដ (Pulling latest changes)...")
        pull_res = subprocess.run([git_bin, "pull", "origin", "main"], capture_output=True, text=True)
        
        print("\n" + "-" * 40)
        print(pull_res.stdout.strip() if pull_res.stdout else pull_res.stderr.strip())
        print("-" * 40)

        # Check version.json
        if os.path.exists("version.json"):
            with open("version.json", "r", encoding="utf-8") as f:
                meta = json.load(f)
                print(f"\n[✓] កំណែបច្ចុប្បន្ន (Current Version): v{meta.get('version')} (Build {meta.get('build')})")
                changelog = meta.get('changelog', {})
                if 'km' in changelog:
                    print(f"    {changelog['km']}")

        print("\n[✓] ការធ្វើបច្ចុប្បន្នភាពបានបញ្ចប់ដោយជោគជ័យ! (Update Complete)")
        print("    អ្នកអាចបើកកម្មវិធីឡើងវិញបាន។")

    except Exception as e:
        print(f"\n[!] កំហុសកំឡុងពេល Update: {e}")

    input("\nPress Enter to close / ចុច Enter ដើម្បីបិទ...")

if __name__ == '__main__':
    main()
