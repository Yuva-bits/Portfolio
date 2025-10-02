#!/usr/bin/env python3
"""
Simple script to rebuild the static site after content changes
"""

import subprocess
import sys
import os

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed:")
        print(f"Error: {e.stderr}")
        return False

def main():
    print("🚀 Rebuilding static website...")
    print("=" * 50)
    
    # Check if we're in the right directory
    if not os.path.exists('client'):
        print("❌ Error: 'client' directory not found. Please run this script from the project root.")
        sys.exit(1)
    
    # Build the static site
    if not run_command("npm run build", "Building static site"):
        print("❌ Build failed. Please check the errors above.")
        sys.exit(1)
    
    print("\n🎉 Static site rebuilt successfully!")
    print("\n📁 Built files are in: client/build/")
    print("🌐 To preview locally, run: npm run preview")
    print("🚀 To deploy, push changes to GitHub")

if __name__ == "__main__":
    main()
