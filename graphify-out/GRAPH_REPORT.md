# Graph Report - PlantPDF  (2026-11-06)

## Corpus Check
- 139 files · ~292,002 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 32 file(s) not represented in the graph (top: .ttf 20, (none) 5, .css 3)

## Summary
- 2289 nodes · 7328 edges · 91 communities (74 shown, 17 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 234 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `283d01e3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Inspector & Font Panels
- ui/recovery.js
- Site Plan Geometry
- EditMode
- PDF Form Fields
- render.js
- desktop-bridge.js
- model.js
- Release Workflow
- .change
- cff.js
- Manual Builder
- package.json
- T
- app.js
- Playwright Test Setup
- Page Organize & Numbering
- Inline Text Editor
- svg.js
- Electron Main Window
- font-manager.js
- FormDesign
- pdfName
- Desktop Security & Menu
- Regression Test Helpers
- Desktop Tests & Node APIs
- SignatureTool
- studio.js
- Auto-Updater
- edit-mode.js
- Auto-Release Workflow
- $$
- signature-extract.js
- idbPut
- studio-fotos.spec.js
- Stream Limits & Ligatures
- PathEditor
- Page View
- NSIS Installer Config
- update-banner.js
- devDependencies
- Interaction Tests
- File Access Grants
- toast
- scripts
- build.mjs
- studio-vorgaben.spec.js
- e2e
- High-Zoom Detail Renderer
- Security Tests
- dependencies
- wiring.js
- Brand & Rendering Docs
- PathEditor
- session.js
- .drawSelection
- Text Layout Analysis
- Electron Builder Base
- PDF Renderer & Print
- Feature Docs
- Window State
- Legacy 1.0 Editor
- export.js
- Zoom Gestures
- forms.spec.js
- Zoom Tests
- Electron Fuses
- Security & Update Docs
- interpretContent
- Redesign Skill
- Font Licenses
- Windows Build Target
- Storage & Migration Docs
- EXIF Photo Dates
- Linux Build Target
- Prettier Config
- Studio
- Extra Resources
- Session Start Hook
- Images & Snap Lines Docs
- Form Filling Docs
- Browser-like Navigation Docs
- showPresetsDialog
- desktop.spec.js
- graphify-standalone.py
- PdfSession
- studio-speichern.spec.js
- PlantPDF

## God Nodes (most connected - your core abstractions)
1. `htmlToElement()` - 139 edges
2. `Studio` - 130 edges
3. `escapeHtml()` - 101 edges
4. `$$` - 98 edges
5. `EditMode` - 89 edges
6. `icon()` - 89 edges
7. `App` - 88 edges
8. `toast()` - 76 edges
9. `PdfSession` - 73 edges
10. `start()` - 60 edges

## Surprising Connections (you probably didn't know these)
- `Legacy app shell (top bar, left panel, ctx bar, pages, nav, thumbs rail)` --semantically_similar_to--> `src/index.html HTML shell template`  [INFERRED] [semantically similar]
  legacy/PDF-Editor-1.0.html → src/index.html
- `PDF-Editor 1.0 (legacy single-file build)` --semantically_similar_to--> `dist/PDF-Editor.html (single-file build)`  [INFERRED] [semantically similar]
  legacy/PDF-Editor-1.0.html → README.md
- `Seiten organisieren / Seitenzahlen anpassen` --semantically_similar_to--> `Legacy organize-pages UI (insert, rotate, duplicate, delete, export)`  [INFERRED] [semantically similar]
  LIESMICH.txt → legacy/PDF-Editor-1.0.html
- `Text bearbeiten` --semantically_similar_to--> `Legacy inline text editor (te-frame)`  [INFERRED] [semantically similar]
  LIESMICH.txt → legacy/PDF-Editor-1.0.html
- `plantpdf-document.svg Document icon` --conceptually_related_to--> `LIESMICH user manual (PlantPDF)`  [INFERRED]
  assets/icon/marke/README.txt → LIESMICH.txt

## Import Cycles
- 2-file cycle: `src/studio/manual-edit.js -> src/studio/studio.js -> src/studio/manual-edit.js`
- 2-file cycle: `src/studio/overlay-edit.js -> src/studio/studio.js -> src/studio/overlay-edit.js`

## Hyperedges (group relationships)
- **Bundled OFL-licensed fonts** — assets_fonts_full_lizenz_barlow_barlow, assets_fonts_full_lizenz_ibm_plex_ibm_plex, assets_fonts_full_lizenz_barlow_sil_open_font_license, liesmich_fonts [EXTRACTED 1.00]
- **Single-file build compared against legacy in regression tests** — readme_build_pipeline, src_index, readme_dist_pdf_editor_html, readme_regression_tests, legacy_pdf_editor_1_0 [EXTRACTED 1.00]
- **Dokumentation workspace parts sharing device data** — liesmich_lageplan, liesmich_zugangsdaten, liesmich_fotodokumentation, liesmich_qr_codes, readme_studio [INFERRED 0.85]

## Communities (91 total, 17 thin omitted)

### Community 0 - "Inspector & Font Panels"
Cohesion: 0.08
Nodes (97): installTabStrip(), render(), startDrag(), accessBlocksEditor(), accessColsEditor(), accessTablesEditor(), listEditor(), chapterLabels() (+89 more)

### Community 1 - "ui/recovery.js"
Cohesion: 0.28
Nodes (10): db(), deleteCopy(), loadCopy(), orphanCopies(), putCopy(), req(), run(), windowId (+2 more)

### Community 2 - "Site Plan Geometry"
Cohesion: 0.08
Nodes (63): centroid(), dist(), fmt(), formatArea(), formatLength(), inPolygon(), LEGEND_H, LEGEND_ROWS (+55 more)

### Community 4 - "PDF Form Fields"
Cohesion: 0.10
Nodes (44): appearanceColors(), appearanceFits(), applyFieldValue(), checkboxAppearances(), composeDA(), createField(), deleteField(), describeWidget() (+36 more)

### Community 5 - "render.js"
Cohesion: 0.12
Nodes (31): BODY, COVER_FIELDS, isEmptySection(), overlaysOf(), COVER_LEFT, coverBody(), coverItems(), diagramHits() (+23 more)

### Community 6 - "desktop-bridge.js"
Cohesion: 0.11
Nodes (16): abortError(), COMMANDS, DesktopFileHandle, fileError(), installDesktopBridge(), isDesktop, notifyDocumentState(), settle() (+8 more)

### Community 7 - "model.js"
Cohesion: 0.06
Nodes (63): ACCESS_TABLES(), appendToGroup(), BLOCK_TYPES, BUS_KINDS, clamp(), cleanAccessCols(), cleanCategories(), cleanChapters() (+55 more)

### Community 8 - "Release Workflow"
Cohesion: 0.05
Nodes (48): concurrency, cancel-in-progress, group, run, CSC_IDENTITY_AUTO_DISCOVERY, REF_NAME, skip_regression, jobs (+40 more)

### Community 9 - ".change"
Cohesion: 0.09
Nodes (6): newCustomSymbol(), newHint(), newPhoto(), newSymbol(), nextPinName(), readImage()

### Community 10 - "cff.js"
Cohesion: 0.22
Nodes (15): buildCffDisplayFont(), glyphNameCandidates(), readCffCharset(), readCffDict(), readCffIndex(), readUint16(), readUintN(), wrapCffAsOpenType() (+7 more)

### Community 11 - "Manual Builder"
Cohesion: 0.16
Nodes (44): atomsCallout(), atomsCards(), atomsFigsteps(), atomsFigure(), atomsOf(), atomsSigns(), atomsTable(), base() (+36 more)

### Community 12 - "package.json"
Cohesion: 0.15
Nodes (12): author, name, description, engines, node, license, main, name (+4 more)

### Community 13 - "T"
Cohesion: 0.12
Nodes (31): cleanAccess(), copy(), DEFAULT_MARKS(), deviceHasData(), deviceOf(), newAccess(), newBlock(), newBox() (+23 more)

### Community 15 - "app.js"
Cohesion: 0.09
Nodes (18): MODE_TOOLS, objectId(), objectIds, readStripSetting(), readWorkspace(), ZOOM_LEVELS, ZOOM_PRESETS, keepTopBarFitting() (+10 more)

### Community 16 - "Playwright Test Setup"
Cohesion: 0.08
Nodes (7): @playwright/test, launch(), openPdf(), setup(), expectUnreadable(), labels(), openManual()

### Community 17 - "Page Organize & Numbering"
Cohesion: 0.17
Nodes (7): approxEqual(), copyRunningElements(), detectPageStructure(), formatPageNumber(), updatePageNumbers(), blockToEditLines(), OrganizeMode

### Community 18 - "Inline Text Editor"
Cohesion: 0.11
Nodes (8): LIGATURES, cssRgb(), isLetter(), isLowercase(), parseCssColor(), roundTo(), TextEditor, trackPointer()

### Community 19 - "svg.js"
Cohesion: 0.10
Nodes (42): accessPages(), blockHasData(), cellLines(), hasSecrets(), valueText(), atomsPush(), chapterPages(), drawLines() (+34 more)

### Community 20 - "Electron Main Window"
Cohesion: 0.18
Nodes (36): frameColors(), start(), activateNear(), activateTab(), applyFrameColors(), broadcastTabs(), closeTab(), command() (+28 more)

### Community 21 - "font-manager.js"
Cohesion: 0.06
Nodes (18): @pdf-lib/fontkit, FontFamily, fontKey(), FontLibrary, FontManager, hex4(), isBlankChar(), localFontSources() (+10 more)

### Community 22 - "FormDesign"
Cohesion: 0.22
Nodes (3): FormDesign, fromHex(), toHex()

### Community 23 - "pdfName"
Cohesion: 0.10
Nodes (21): glyphIdSetCache, isSpaceCodePoint(), mappedGlyphIds(), parseSfnt(), readAdvanceWidths(), readCmaps(), readFontInfo(), readGlyphData() (+13 more)

### Community 24 - "Desktop Security & Menu"
Cohesion: 0.11
Nodes (22): contentSecurityPolicy(), EDITOR_HTML, ICON, printErrorText(), ROOT, splitEditor(), hardenSession(), lastDirectory() (+14 more)

### Community 25 - "Regression Test Helpers"
Cohesion: 0.15
Nodes (18): waitForDocument(), canvasHashes(), clientPoint(), findBlock(), FIXTURE, idle(), inkHash(), LAYOUT (+10 more)

### Community 26 - "Desktop Tests & Node APIs"
Cohesion: 0.07
Nodes (20): DIST, PORT, TYPES, child, cli, ROOT, FONT_DIR, line (+12 more)

### Community 27 - "SignatureTool"
Cohesion: 0.07
Nodes (29): SignaturePad, addSignature(), deleteSignature(), emit(), getDefaultSignature(), getSignature(), listeners, listSignatures() (+21 more)

### Community 28 - "studio.js"
Cohesion: 0.11
Nodes (33): reviveFileHandle(), liveWindows(), withoutSecrets(), documentLabel(), AUTO, autoMeta(), db(), deleteAutosave() (+25 more)

### Community 29 - "Auto-Updater"
Cohesion: 0.16
Nodes (22): autoCheck(), installUpdate(), manualCheck(), allowedUrl(), DOWNLOAD_HOSTS, isNewer(), LATEST_URL, pickUpdate() (+14 more)

### Community 30 - "edit-mode.js"
Cohesion: 0.19
Nodes (15): isTranslationMatrix(), boxContains(), boxInside(), hexToRgb(), mmToPt(), ptToMm(), rgbToHex(), unionBoxes() (+7 more)

### Community 31 - "Auto-Release Workflow"
Cohesion: 0.09
Nodes (22): concurrency, cancel-in-progress, group, GH_TOKEN, jobs, tag, name, on (+14 more)

### Community 32 - "$$"
Cohesion: 0.09
Nodes (3): App, formatZoom(), $$

### Community 33 - "signature-extract.js"
Cohesion: 0.16
Nodes (19): clamp01(), cropToAlpha(), dilate(), estimateBackground(), extractSignature(), histPercentile(), INK_COLORS, luminanceOf() (+11 more)

### Community 34 - "idbPut"
Cohesion: 0.27
Nodes (4): describeRemoved(), hasRemoved(), fileErrorReason(), idbPut()

### Community 37 - "Stream Limits & Ligatures"
Cohesion: 0.14
Nodes (24): pdf-lib, DANGEROUS_ACTIONS, N(), REMOVED_ANNOTATIONS, withoutActiveContent(), readStreamBytes(), applyClusters(), attachClusters() (+16 more)

### Community 38 - "PathEditor"
Cohesion: 0.12
Nodes (20): bezier(), deleteNodes(), deleteSegment(), detachSegment(), flattenSeg(), insideFill(), moveNodes(), nearestNode() (+12 more)

### Community 40 - "NSIS Installer Config"
Cohesion: 0.11
Nodes (19): nsis, allowElevation, allowToChangeInstallationDirectory, artifactName, createDesktopShortcut, createStartMenuShortcut, deleteAppDataOnUninstall, differentialPackage (+11 more)

### Community 41 - "update-banner.js"
Cohesion: 0.25
Nodes (12): reduced(), saveFlash(), saveProgress(), wait(), closeOverlay(), ensureOverlay(), mb(), RING_LEN (+4 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, @agentclientprotocol/claude-agent-acp@0.100.0, @e2e-dev/acp@0.1.0, electron@44.5.1, electron-builder@26.15.3, esbuild@0.28.2, @playwright/test@1.56.1, prettier@3.9.9 (+5 more)

### Community 43 - "Interaction Tests"
Cohesion: 0.15
Nodes (9): settled(), clickAt(), DIR, drag(), escape(), GRAFIK, pt(), pts() (+1 more)

### Community 44 - "File Access Grants"
Cohesion: 0.20
Nodes (8): FileAccess, FileAccessError, isPdfPath(), MESSAGES, pdfPathsFromArgv(), printRequestFromArgv(), renameWithRetry(), RETRY_CODES

### Community 45 - "toast"
Cohesion: 0.09
Nodes (29): CAPTURE_DPI, decodeImageFile(), downscaleImage(), encodePng(), imageToCanvas(), MAX_PROCESS_PX, pickPageRegion(), renderPdfRegion() (+21 more)

### Community 46 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, app, build, build:desktop, dev, dist:linux, dist:win, fixtures (+5 more)

### Community 47 - "build.mjs"
Cohesion: 0.23
Nodes (12): build(), buildWorkerSource(), fill(), FONT_DIR, ICON_DIR, loadBundledFonts(), loadLogos(), OUT_FILE (+4 more)

### Community 49 - "e2e"
Cohesion: 0.27
Nodes (6): serve, DOKUMENT_PDF_B64, e2e@0.22.0, @e2e-dev/web@0.15.4, e2e, @e2e-dev/web

### Community 50 - "High-Zoom Detail Renderer"
Cohesion: 0.23
Nodes (6): area(), DETAIL_MAX_PX, DetailRenderer, grow(), intersect(), OVERSCAN

### Community 51 - "Security Tests"
Cohesion: 0.17
Nodes (11): extractText(), activePdf(), badWindowBomb(), bombPdf(), entries(), inspect(), modelAfterOpen(), N() (+3 more)

### Community 52 - "dependencies"
Cohesion: 0.22
Nodes (9): dependencies, pako@1.0.11, pdf-lib@1.17.1, @pdf-lib/fontkit@1.1.1, pdfjs-dist@4.10.38, qrcode-generator@2.0.4, pako, pdfjs-dist (+1 more)

### Community 54 - "wiring.js"
Cohesion: 0.13
Nodes (31): LEGACY_COLUMNS, TERMINAL_COLUMNS, color(), boxText(), busLabel(), catColor(), categoryOf(), catStroke() (+23 more)

### Community 55 - "Brand & Rendering Docs"
Cohesion: 0.18
Nodes (12): plantpdf-app.svg App icon (graphite tile), Brand colors (Petrol, Orange, Flansch), PlantPDF Markenpaket (brand package), plantpdf-document.svg Document icon, Bundled pdf.js (GlobalWorkerOptions, worker blob), Zoomen bis 3200 % und Hand-Werkzeug, Build (scripts/build.mjs, esbuild IIFE), pdf.js (+4 more)

### Community 56 - "PathEditor"
Cohesion: 0.20
Nodes (4): cloneSubpaths(), pagePaths(), constrainAngle(), PathEditor

### Community 57 - "session.js"
Cohesion: 0.13
Nodes (12): bytesToHexString(), bytesToLatin1(), DELIMITERS, DictToken, formatNumber(), latin1ToBytes(), NameToken, serializeOp() (+4 more)

### Community 59 - "Text Layout Analysis"
Cohesion: 0.33
Nodes (9): buildTextBlocks(), buildTextLines(), finalizeBlock(), findNear(), hasJustifiedRightEdge(), isSpaceChar(), isUpright(), onSameBaseline() (+1 more)

### Community 60 - "Electron Builder Base"
Cohesion: 0.17
Nodes (11): appId, artifactName, asar, copyright, directories, output, electronLanguages, files (+3 more)

### Community 62 - "Feature Docs"
Cohesion: 0.18
Nodes (10): Bundled pdf-lib + fontkit (PDFDocument, xref writer), ToUnicode CMap generation (Adobe-Identity-UCS), Fotodokumentation linked to Lageplan, Lageplan (site plan with devices, Richtfunk, Maßstab), Bild / QR-Code placement, Two workspaces: PDF and Dokumentation, Zugangsdaten (device credentials), PdfSession (session.js) (+2 more)

### Community 64 - "Window State"
Cohesion: 0.31
Nodes (9): bounds(), DEFAULT_SIZE, loadWindowState(), MIN_SIZE, rememberTheme(), stateFile(), THEMES, trackWindowState() (+1 more)

### Community 65 - "Legacy 1.0 Editor"
Cohesion: 0.24
Nodes (10): PDF-Editor 1.0 (legacy single-file build), Legacy app shell (top bar, left panel, ctx bar, pages, nav, thumbs rail), Legacy CSS design tokens (:root --ink/--acc ...), Legacy start page (drop zone, features, recent), Legacy organize-pages UI (insert, rotate, duplicate, delete, export), Legacy inline text editor (te-frame), Seiten organisieren / Seitenzahlen anpassen, Text bearbeiten (+2 more)

### Community 66 - "export.js"
Cohesion: 0.12
Nodes (21): assertPrintable(), canMakePdf(), contentFingerprint(), embedProject(), hasProject(), makePdf(), maker(), printHtml() (+13 more)

### Community 68 - "forms.spec.js"
Cohesion: 0.22
Nodes (3): formPdf(), N(), savedBytes()

### Community 69 - "Zoom Tests"
Cohesion: 0.11
Nodes (4): BUILDS, objectsOf(), zoomIdle(), zoomOnto()

### Community 71 - "Electron Fuses"
Cohesion: 0.25
Nodes (8): electronFuses, enableCookieEncryption, enableEmbeddedAsarIntegrityValidation, enableNodeCliInspectArguments, enableNodeOptionsEnvironmentVariable, grantFileProtocolExtraPrivileges, onlyLoadAppFromAsar, runAsNode

### Community 72 - "Security & Update Docs"
Cohesion: 0.25
Nodes (4): Update-Suche über GitHub, Desktop-App (Electron), Release / Auto-Release GitHub workflows, Updater (GitHub releases, SHA-256 check)

### Community 73 - "interpretContent"
Cohesion: 0.18
Nodes (10): interpretContent(), resolveColorSpace(), toRgb(), IDENTITY_MATRIX, toNumber(), transformPoint(), fromPage(), PathRecorder (+2 more)

### Community 75 - "Font Licenses"
Cohesion: 0.38
Nodes (7): Barlow font (The Barlow Project Authors), Barlow Font License (SIL OFL 1.1), SIL Open Font License 1.1, IBM Plex font (Reserved Font Name Plex), IBM Plex Font License (SIL OFL 1.1), Bedienungsanleitung template (bilingual), Schriften (built-in Barlow, IBM Plex Mono, custom font loading)

### Community 76 - "Windows Build Target"
Cohesion: 0.29
Nodes (7): arch, target, win, icon, legalTrademarks, requestedExecutionLevel, target

### Community 77 - "Storage & Migration Docs"
Cohesion: 0.29
Nodes (6): IndexedDB pdf-editor v1, Automatische Wiederherstellung, Umstieg von Version 1.0 (storage migration), Unterschrift hinterlegen und einsetzen, IndexedDB stores (pdf-editor v2, pdfix-studio), Signature module (extract, capture, draw, store)

### Community 79 - "EXIF Photo Dates"
Cohesion: 0.60
Nodes (5): ascii(), entries(), exifDate(), photoDate(), toIso()

### Community 80 - "Linux Build Target"
Cohesion: 0.50
Nodes (4): linux, category, icon, target

### Community 82 - "Prettier Config"
Cohesion: 0.50
Nodes (3): printWidth, singleQuote, trailingComma

### Community 83 - "Studio"
Cohesion: 0.08
Nodes (5): toolOf(), fileLabel(), inArea(), rememberCompany(), Studio

### Community 84 - "Extra Resources"
Cohesion: 0.67
Nodes (3): extraResources, from, to

### Community 90 - "showPresetsDialog"
Cohesion: 0.11
Nodes (39): cleanAccessPresets(), cleanCoverFields(), cleanList(), cleanPageLook(), defaultAccessPresets(), defaultCoverFields(), defaultLook(), formatDocNo() (+31 more)

### Community 92 - "desktop.spec.js"
Cohesion: 0.12
Nodes (5): ELECTRON, hasXdotool, ROOT, exampleProject(), openExample()

### Community 96 - "PdfSession"
Cohesion: 0.09
Nodes (8): ContentOp, newOp(), parseContentStream(), restoreChanges(), invertMatrix(), multiplyMatrix(), userMatrix(), PdfSession

### Community 103 - "PlantPDF"
Cohesion: 0.67
Nodes (4): Former name PDFix (until 2.13), LIESMICH user manual (PlantPDF), Julius Steiner (Developer), PlantPDF

## Ambiguous Edges - Review These
- `Automatische Wiederherstellung` → `IndexedDB stores (pdf-editor v2, pdfix-studio)`  [AMBIGUOUS]
  LIESMICH.txt · relation: shares_data_with

## Knowledge Gaps
- **18 isolated node(s):** `plantpdf-app.svg App icon (graphite tile)`, `Zoomen bis 3200 % und Hand-Werkzeug`, `Schnelldruck (silent print via ProgID verbs)`, `ToUnicode CMap generation (Adobe-Identity-UCS)`, `Fotodokumentation linked to Lageplan` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 439 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `pdf-lib` connect `Stream Limits & Ligatures` to `PDF Form Fields`, `package.json`, `app.js`, `Playwright Test Setup`, `font-manager.js`, `pdfName`, `Desktop Tests & Node APIs`, `studio.js`, `studio-fotos.spec.js`, `Interaction Tests`, `toast`, `Security Tests`, `dependencies`, `studio-anschlussplan.spec.js`, `export.js`, `forms.spec.js`, `Zoom Tests`, `interpretContent`, `desktop.spec.js`?**
  _High betweenness centrality (0.210) - this node is a cross-community bridge._
- **What connects `plantpdf-app.svg App icon (graphite tile)`, `Zoomen bis 3200 % und Hand-Werkzeug`, `Schnelldruck (silent print via ProgID verbs)` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Inspector & Font Panels` be split into smaller, more focused modules?**
  _Cohesion score 0.07705914870093974 - nodes in this community are weakly interconnected._
- **Why does `$$` connect `$$` to `Inspector & Font Panels`, `ui/recovery.js`, `idbPut`, `Site Plan Geometry`, `.onDown`, `EditMode`, `.change`, `update-banner.js`, `toast`, `.finishEdit`, `app.js`, `Page Organize & Numbering`, `Studio`, `FormDesign`, `studio.js`, `edit-mode.js`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Should `Site Plan Geometry` be split into smaller, more focused modules?**
  _Cohesion score 0.07715260017050299 - nodes in this community are weakly interconnected._
- **Why does `Studio` connect `Studio` to `Inspector & Font Panels`, `$$`, `export.js`, `.change`, `T`, `toast`, `app.js`, `studio.js`, `PDF Renderer & Print`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Automatische Wiederherstellung` and `IndexedDB stores (pdf-editor v2, pdfix-studio)`?**
  _Edge tagged AMBIGUOUS (relation: shares_data_with) - confidence is low._