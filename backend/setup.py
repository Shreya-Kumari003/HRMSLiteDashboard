#!/usr/bin/env python3
"""
Setup script for HRMS Lite Backend
"""
import os
import sys
import subprocess

def run_command(command):
    """Run a shell command and return the result"""
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✓ {command}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"✗ {command}")
        print(f"Error: {e.stderr}")
        return False

def main():
    print("Setting up HRMS Lite Backend...")
    
    # Install dependencies
    print("\n1. Installing dependencies...")
    if not run_command("pip install -r requirements.txt"):
        sys.exit(1)
    
    # Run migrations
    print("\n2. Running database migrations...")
    if not run_command("python manage.py makemigrations"):
        sys.exit(1)
    
    if not run_command("python manage.py migrate"):
        sys.exit(1)
    
    print("\n✓ Backend setup complete!")
    print("\nTo start the server, run:")
    print("python manage.py runserver")

if __name__ == "__main__":
    main()