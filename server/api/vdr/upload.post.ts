import { defineEventHandler, readMultipartFormData, createError } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Berkas tidak ditemukan dalam formulir unggahan.'
      })
    }

    const fileItem = formData.find(item => item.name === 'file' && item.filename)
    if (!fileItem || !fileItem.data) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Berkas dokumen wajib dilampirkan.'
      })
    }

    const titleItem = formData.find(item => item.name === 'title')
    const categoryItem = formData.find(item => item.name === 'category')
    const docTitle = titleItem?.data?.toString('utf-8') || fileItem.filename || 'Dokumen Legalitas'
    const docCategory = categoryItem?.data?.toString('utf-8') || 'Legalitas'

    // Supabase Credentials
    const supabaseUrl = process.env.NUXT_PUBLIC_SUPABASE_URL || 'https://zqysbqmtqnovxwbjfyxx.supabase.co'
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxeXNicW10cW5vdnh3YmpmeXh4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTg1OTM5MywiZXhwIjoyMTA3NDM1MzkzfQ.RTbzHfSJsK9yU-jBSdbJat51mwUXBtCEUjsH8RYC_-A'
    const anonKey = process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_QmEBHC4UKXotpvHrCa1VIQ_oI6Uy_gY'

    // Format clean safe filename for storage
    const timestamp = Date.now()
    const sanitizedFilename = fileItem.filename.replace(/[^a-zA-Z0-9._-]/g, '_')
    const storagePath = `${timestamp}_${sanitizedFilename}`

    const mimeType = fileItem.type || (
      sanitizedFilename.toLowerCase().endsWith('.pdf')
        ? 'application/pdf'
        : sanitizedFilename.toLowerCase().endsWith('.png')
          ? 'image/png'
          : sanitizedFilename.toLowerCase().endsWith('.webp')
            ? 'image/webp'
            : 'image/jpeg'
    )

    // Upload directly to Supabase Storage vdr-vault bucket using Service Role Key (Bypasses RLS safely on server)
    const targetUrl = `${supabaseUrl}/storage/v1/object/vdr-vault/${storagePath}`

    const uploadRes = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey,
        'Content-Type': mimeType,
        'x-upsert': 'true'
      },
      body: fileItem.data
    })

    if (!uploadRes.ok) {
      const errText = await uploadRes.text().catch(() => '')
      console.error('[Nuxt Supabase Upload] Failed:', uploadRes.status, errText)
      throw createError({
        statusCode: uploadRes.status,
        statusMessage: `Gagal mengunggah berkas ke Supabase Storage: ${errText || uploadRes.statusText}`
      })
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/vdr-vault/${storagePath}`
    const sizeInMB = (fileItem.data.length / (1024 * 1024)).toFixed(1) + ' MB'

    return {
      success: true,
      message: `Berkas ${docTitle} berhasil disimpan di Supabase Cloud Storage.`,
      data: {
        name: docTitle,
        fileName: sanitizedFilename,
        storagePath: `vdr-vault/${storagePath}`,
        fileUrl: publicUrl,
        size: sizeInMB,
        category: docCategory,
        mimeType
      }
    }
  } catch (err: any) {
    console.error('[Nuxt Storage API Error]', err)
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || err.message || 'Terjadi gangguan internal saat mengunggah dokumen.'
    })
  }
})
