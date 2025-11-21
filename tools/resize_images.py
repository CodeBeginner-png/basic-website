#!/usr/bin/env python3
"""Resize and convert images in assets/images to multiple widths and WebP.

Usage:
  python tools/resize_images.py --input assets/images --output assets/images/processed \
    --sizes 480 768 1024 1600 --formats jpg webp

This script will create files with suffixes like `photo-480.jpg` and `photo-480.webp`.
"""
from PIL import Image
from pathlib import Path
import argparse
import sys


def parse_args():
    p = argparse.ArgumentParser(description="Resize images to multiple widths and convert to webp")
    p.add_argument("--input", required=True, help="input directory with images")
    p.add_argument("--output", required=True, help="output directory")
    p.add_argument("--sizes", nargs='+', type=int, default=[480,768,1024,1600], help="widths to generate")
    p.add_argument("--formats", nargs='+', default=["jpg","webp"], help="output formats")
    p.add_argument("--quality", type=int, default=85, help="output quality (for JPEG/WEBP)")
    return p.parse_args()


def make_output_path(out_dir: Path, src_name: str, width: int, fmt: str):
    stem = Path(src_name).stem
    return out_dir / f"{stem}-{width}.{fmt}"


def process_image(path: Path, out_dir: Path, sizes, formats, quality):
    try:
        img = Image.open(path)
    except Exception as e:
        print(f"Skipping {path}: cannot open ({e})")
        return

    img_format = img.format
    for w in sizes:
        # compute new size preserving aspect
        ratio = w / img.width
        h = int(img.height * ratio)
        resized = img.resize((w, h), Image.LANCZOS)

        for fmt in formats:
            out_path = make_output_path(out_dir, path.name, w, fmt)
            out_path.parent.mkdir(parents=True, exist_ok=True)
            save_kwargs = {}
            if fmt.lower() in ("jpg", "jpeg"):
                save_kwargs["quality"] = quality
                save_kwargs["optimize"] = True
                rgb = resized.convert("RGB")
                rgb.save(out_path, format="JPEG", **save_kwargs)
            elif fmt.lower() == "webp":
                save_kwargs["quality"] = quality
                resized.save(out_path, format="WEBP", **save_kwargs)
            else:
                # default: save in original format
                resized.save(out_path)

    print(f"Processed {path.name}")


def main():
    args = parse_args()
    in_dir = Path(args.input)
    out_dir = Path(args.output)

    if not in_dir.exists() or not in_dir.is_dir():
        print(f"Input directory {in_dir} does not exist or is not a directory.")
        sys.exit(1)

    images = [p for p in in_dir.iterdir() if p.suffix.lower() in ('.jpg', '.jpeg', '.png')]
    if not images:
        print("No jpg/png images found in input directory.")
        sys.exit(0)

    for img_path in images:
        process_image(img_path, out_dir, args.sizes, args.formats, args.quality)


if __name__ == '__main__':
    main()
