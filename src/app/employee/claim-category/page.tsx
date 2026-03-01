'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Category {
    key: string;
    label: string;
}

export default function ClaimCatagory() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [facehuggerExposure, setFacehuggerExposure] = useState(false);
    const [destination, setDestination] = useState('');
    const [returnTrip, setReturnTrip] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [receiptImage, setReceiptImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [claimDescription, setClaimDescription] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);

        if (newCategory !== 'MEDICAL') {
            setFacehuggerExposure(false);
        }

        if (newCategory !== 'TRAVEL') {
            setDestination('');
            setReturnTrip('');
        }
    };

    // Upload image of receipt
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload only JPEG or PNG images');
                e.target.value = ''; // Reset input
                return;
            }

            // Validate file size (5MB limit)
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (file.size > maxSize) {
                alert('File size must be less than 5MB');
                e.target.value = ''; // Reset input
                return;
            }

            // Set the file
            setReceiptImage(file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            {/* Header */}
            <header>
                <div className="flex items-center gap-4 mb-6">
                    <img src="/images/weyyuLogo.png" alt="Company Logo" width={150} height={150} />
                    <div className="text-3xl font-bold">
                        Welcome to Weyland-Yutani's Employee Claims Service
                    </div>
                </div>
            </header>

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">Submit Your Claim!</h1>
                    <p className="text-gray-600">Please fill out the form below to submit a new claim</p>
                </div>

                {/* Claim Catagory */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-6">Claim Information</h2>

                    {/* Select Category */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Category</label>
                        <select value={selectedCategory} onChange={handleCategoryChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.key} value={category.key}>
                                    {category.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Medical Category checkbox */}
                    {selectedCategory === 'MEDICAL' && (
                        <div className="mb-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    checked={facehuggerExposure}
                                    onChange={(e) => setFacehuggerExposure(e.target.checked)}
                                />
                                <span>Facehugger Exposure</span>
                            </label>
                        </div>
                    )}

                    {/* Travel Category fields */}
                    {selectedCategory === 'TRAVEL' && (
                        <div className="mb-4 space-y-4">
                            <div>
                                <label className="block font-semibold mb-2">Where are you traveling to?</label>
                                <input
                                    type="text"
                                    value={claimDescription}
                                    onChange={(e) => setClaimDescription(e.target.value)}
                                    placeholder="Enter Address"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2">Where are you traveling from?</label>
                                <input
                                    type="text"
                                    value={returnTrip}
                                    onChange={(e) => setReturnTrip(e.target.value)}
                                    placeholder="Enter Address"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    )}

                    {/* Claim Description */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Claim Description</label>
                        <textarea placeholder="Enter description here" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={5} />
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <button className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold">
                            <Link href="/employee/claim-dashboard">
                                Back
                            </Link>
                        </button>
                        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                            <Link href="/employee/claim-success">
                                Submit
                            </Link>
                        </button>
                    </div>

                    {/* Receipt Upload */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Upload Receipt (Optional)</label>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleImageUpload}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Accepted formats: JPG, PNG. Max size: 5MB
                        </p>

                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="mt-4">
                                <p className="text-sm font-semibold mb-2">Preview:</p>
                                <img
                                    src={imagePreview}
                                    alt="Receipt preview"
                                    className="max-w-xs max-h-48 border border-gray-300 rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setReceiptImage(null);
                                        setImagePreview(null);
                                    }}
                                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                                >
                                    Remove image
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}