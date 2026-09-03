from PIL import Image

# Open the PNG image you downloaded
input_path = "./images/for_favicon.png"
output_path = "favicon.ico"

with Image.open(input_path) as img:
    # Save as ICO with standard web favicon dimensions
    img.save(
        output_path,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)]
    )

print("favicon.ico created successfully!")
