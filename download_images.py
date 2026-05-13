"""
Script pour télécharger les photos SUV sans marque pour Bordeaux Privilège.
Double-cliquez sur ce fichier ou lancez: python download_images.py
"""

import urllib.request
import os
import shutil

ASSETS_DIR = os.path.join(os.path.dirname(__file__), "public", "assets")

# Photos SUV luxe sans marque visible (Pexels - libres de droits)
IMAGES = {
    "hero.jpg": [
        # SUV noir nuit - cinématique
        "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
        # Backup
        "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    ],
    "fleet.jpg": [
        # SUV profil urbain luxe
        "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
        # Backup
        "https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    ]
}

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

def download(url, dest):
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=30) as response:
        with open(dest, "wb") as f:
            f.write(response.read())

os.makedirs(ASSETS_DIR, exist_ok=True)

for filename, urls in IMAGES.items():
    dest = os.path.join(ASSETS_DIR, filename)
    # Backup original
    backup = dest + ".bak"
    if os.path.exists(dest) and not os.path.exists(backup):
        shutil.copy2(dest, backup)
        print(f"  Sauvegarde: {filename}.bak")

    success = False
    for url in urls:
        try:
            print(f"Téléchargement {filename}...")
            download(url, dest)
            size = os.path.getsize(dest)
            if size > 10000:
                print(f"  ✅ {filename} ({size//1024} Ko)")
                success = True
                break
            else:
                print(f"  Trop petit ({size} octets), essai suivant...")
        except Exception as e:
            print(f"  Erreur: {e}, essai suivant...")

    if not success:
        print(f"  ❌ Impossible de télécharger {filename}")

print("\nTerminé ! Relance le serveur ou pousse vers GitHub.")
input("Appuie sur Entrée pour fermer...")
