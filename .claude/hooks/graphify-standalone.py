"""Builds graphify-out/graph-standalone.html: graph.html with vis-network inlined so it opens offline."""
import re
import subprocess
import sys
import tarfile
from pathlib import Path

VIS_VERSION = "9.1.6"
CACHE = Path.home() / ".cache" / "graphify-vis" / f"vis-network-{VIS_VERSION}.min.js"


def vis_source():
    if not CACHE.exists():
        CACHE.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(
            ["npm", "pack", f"vis-network@{VIS_VERSION}", "--silent"],
            cwd=CACHE.parent, check=True, capture_output=True,
        )
        tgz = CACHE.parent / f"vis-network-{VIS_VERSION}.tgz"
        with tarfile.open(tgz) as tar:
            member = tar.extractfile("package/standalone/umd/vis-network.min.js")
            CACHE.write_bytes(member.read())
        tgz.unlink()
    return CACHE.read_text(encoding="utf-8")


def main(out_dir):
    html = (out_dir / "graph.html").read_text(encoding="utf-8")
    vis = vis_source().replace("</script", "<\\/script")
    html, n = re.subn(
        r'<script src="https://unpkg\.com/vis-network[^>]*></script>',
        lambda _: "<script>" + vis + "</script>", html, count=1,
    )
    if n != 1:
        sys.exit("vis-network script tag not found in graph.html")
    (out_dir / "graph-standalone.html").write_text(html, encoding="utf-8")


if __name__ == "__main__":
    main(Path(sys.argv[1]))
