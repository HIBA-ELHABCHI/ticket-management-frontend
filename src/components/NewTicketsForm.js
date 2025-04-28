import React, { useState } from 'react';
import './newTicket.css';

const NewTicketsForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: '',
    assignTo: '',
    attachments: null,
    dueDate: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sample data for dropdowns
  const categories = [
    { id: 1, name: 'Technical Issue' },
    { id: 2, name: 'Feature Request' },
    { id: 3, name: 'Account Problem' },
    { id: 4, name: 'Billing Question' },
    { id: 5, name: 'General Inquiry' }
  ];

  const staff = [
    { id: 1, name: 'Emma Baker' },
    { id: 2, name: 'Olivia Davis' },
    { id: 3, name: 'Ethan Evans' },
    { id: 4, name: 'Sophia Foster' },
    { id: 5, name: 'Mason Green' }
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachments') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.assignTo) {
      newErrors.assignTo = 'Please select a staff member';
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after submission
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          priority: 'medium',
          category: '',
          assignTo: '',
          attachments: null,
          dueDate: ''
        });
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="ticket-form-container">
      <h2 className="ticket-form-title">Create New Ticket</h2>
      
      {isSuccess && (
        <div className="ticket-success-message">
          <i className="fas fa-check-circle"></i>
          <span>Ticket successfully created!</span>
        </div>
      )}
      
      <form className="ticket-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
            placeholder="Enter ticket title"
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
            placeholder="Describe the issue or request in detail"
            rows="4"
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>
        
        <div className="form-row">
          <div className="form-group half">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>
          
          <div className="form-group half">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group half">
            <label htmlFor="assignTo">Assign To</label>
            <select
              id="assignTo"
              name="assignTo"
              value={formData.assignTo}
              onChange={handleChange}
              className={errors.assignTo ? 'error' : ''}
            >
              <option value="">Select staff member</option>
              {staff.map(person => (
                <option key={person.id} value={person.id}>{person.name}</option>
              ))}
            </select>
            {errors.assignTo && <span className="error-message">{errors.assignTo}</span>}
          </div>
          
          <div className="form-group half">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={errors.dueDate ? 'error' : ''}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="attachments">Attachments</label>
          <div className="file-input-container">
            <input
              type="file"
              id="attachments"
              name="attachments"
              onChange={handleChange}
              className="file-input"
            />
            <label htmlFor="attachments" className="file-input-label">
              <i className="fas fa-paperclip"></i>
              <span>{formData.attachments ? formData.attachments.name : 'Choose file'}</span>
            </label>
          </div>
          <span className="file-hint">Max file size: 5MB</span>
        </div>
        
        <div className="form-actions">
          <button type="button" className="btn-cancel">Cancel</button>
          <button 
            type="submit" 
            className="btn-submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Submitting...
              </>
            ) : 'Create Ticket'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTicketsForm;