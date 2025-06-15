import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

// Static summaries keyed by notebook slug
const summaries: Record<string, string> = {
  '01b-exploring-modalities': `# Executive Summary – 1b. Exploring Modalities

## Key Concepts

- **Modality Landscape**: Beyond vision, modern AI leverages text, audio, depth and more. Each modality has its own sampling rate, dimensionality and noise profile.
- **Representation Learning**: Raw sensor streams are transformed into latent embeddings via modality-specific encoders (CNNs for images, spectrogram CNNs for audio, transformers for text).
- **Alignment Objective**: A contrastive loss (e.g. CLIP-style) pulls related modality pairs together and pushes mismatches apart.

## Workflow

1. **Inspect & visualise** RGB images, LiDAR depth maps and textual captions.
2. **Pre-process** each modality (normalise pixels, quantise point-clouds, tokenise text).
3. **Train stand-alone encoders** to obtain image, depth and text embeddings.
4. **Apply contrastive alignment** to create a shared multimodal space.

## Results

<table>
<thead><tr><th>Embedding Pair</th><th>Recall@1</th></tr></thead>
<tbody>
<tr><td>Image → Text</td><td>77&nbsp;%</td></tr>
<tr><td>Depth → Image</td><td>68&nbsp;%</td></tr>
<tr><td>Text → Depth</td><td>63&nbsp;%</td></tr>
</tbody>
</table>

<blockquote>Aligned embeddings enable zero-shot cross-modal retrieval of scene descriptions.</blockquote>

## Practical Insights

- Audio & depth benefit from log-scale normalisation prior to CNN encoding.
- A **shared projection head** (vs per-modality heads) simplifies deployment but may slightly hurt specialised performance.
- Evaluate with **cross-modal retrieval** tasks, not just classification accuracy.

---

<small>The notebook contains interactive widgets to play audio clips and visualise retrieved images side-by-side.</small>` ,
  '01a-early-and-late-fusion': `# Executive Summary – 1a. Early and Late Fusion

## Key Concepts

- **Multimodal Learning** combines complementary sensors (RGB images + LiDAR point-clouds) so a model can reason about colour/texture *and* precise geometry.
- **Fusion Strategy** determines *where* the modalities meet inside the network.

<table>
<thead><tr><th>Strategy</th><th>Where They Merge</th><th>Pros</th><th>Cons</th></tr></thead>
<tbody>
<tr><td><strong>Early&nbsp;Fusion</strong></td><td>Before feature extraction</td><td>Captures cross-modal cues → top accuracy</td><td>Requires tight spatial alignment & heavier model</td></tr>
<tr><td><strong>Late&nbsp;Fusion</strong></td><td>Near classifier head</td><td>Modular, sensors can fail independently</td><td>Risks missing joint correlations</td></tr>
</tbody>
</table>

## Workflow

1. **Load & augment** RGB + LiDAR data.
2. **Train single-modal baselines** (RGB-ResNet, LiDAR-PointNet).
3. **Implement fusion networks** (early & late).
4. **Compare** accuracy, convergence speed & saliency maps.

## Results

<table>
<thead><tr><th>Model</th><th>Test&nbsp;Accuracy</th></tr></thead>
<tbody>
<tr><td>RGB baseline</td><td>81&nbsp;%</td></tr>
<tr><td>LiDAR baseline</td><td>74&nbsp;%</td></tr>
<tr><td><strong>Late Fusion</strong></td><td>86&nbsp;%</td></tr>
<tr><td><strong>Early Fusion</strong></td><td><strong>88&nbsp;%</strong></td></tr>
</tbody>
</table>

<blockquote>Early fusion wins but costs ≈ 15 % more FLOPs.</blockquote>

## Practical Insights

- Early fusion **demands pixel-accurate calibration**; even 1-2 px shifts hurt.
- Late fusion **keeps working if a sensor drops out**, great for field robotics.
- Consider **intermediate (mid-level) fusion** or **transformer cross-attention** for a balance of accuracy and compute.

---

<small>The notebook includes an animated GIF that spins a LiDAR point-cloud, colour-coded by model confidence, to visualise attention.</small>`


}

export default function InsightsPage({ params }: { params: { slug: string } }) {
  const md = summaries[params.slug]
  if (!md) {
    return <p className="text-center mt-12">No insights available for this notebook.</p>
  }
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl prose dark:prose-invert">
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{md}</ReactMarkdown>
    </div>
  )
}

export function generateStaticParams() {
  return Object.keys(summaries).map((slug) => ({ slug }))
}
