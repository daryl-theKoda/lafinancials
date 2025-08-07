import { createClient } from "./client";

type FileWithPath = File & { path?: string };

export const uploadFile = async (
  file: FileWithPath,
  path: string,
  bucket = "business-loan-documents"
): Promise<{ url: string; path: string }> => {
  const supabase = createClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${path}/${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error("Error uploading file:", error);
    throw error;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return {
    url: publicUrl,
    path: data.path,
  };
};

export const deleteFile = async (
  filePath: string,
  bucket = "business-loan-documents"
): Promise<void> => {
  const supabase = createClient();
  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath]);

  if (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

export const uploadMultipleFiles = async (
  files: FileList | File[],
  path: string,
  bucket = "business-loan-documents"
): Promise<Array<{ url: string; path: string; name: string }>> => {
  const uploadPromises = Array.from(files).map(async (file) => {
    const result = await uploadFile(file, path, bucket);
    return {
      ...result,
      name: file.name,
    };
  });

  return Promise.all(uploadPromises);
};

export const getFileUrl = (
  filePath: string,
  bucket = "business-loan-documents"
): string => {
  const supabase = createClient();
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);
  
  return publicUrl;
};

export const downloadFile = async (
  filePath: string,
  bucket = "business-loan-documents"
): Promise<Blob> => {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from(bucket)
    .download(filePath);

  if (error) {
    console.error("Error downloading file:", error);
    throw error;
  }

  return data;
};
