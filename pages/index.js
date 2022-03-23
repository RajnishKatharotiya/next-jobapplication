import {
  getDatabase, ref, push,
} from 'firebase/database';
import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');

  const validateEmail = (email) => String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  const validatePhone = (num) => String(num).match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/);

  const requiredFields = ['email', 'password', 'retypePassword', 'firstName', 'lastName', 'phoneNumber', 'address', 'city', 'province', 'country', 'school', 'program', 'educationLevel']

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    var values = {};
    for (var i = 0; i < e.target.elements.length; i++) {
      var fieldName = e.target.elements[i].name;
      var fieldValue = e.target.elements[i].value;
      if (fieldName) {
        values[fieldName] = fieldValue
      }
    }

    // Validations
    const checkEmptyField = requiredFields.find(e => !values[e]);
    if (checkEmptyField) {
      setMessageType('error');
      setMessage('Please enter all required field!')
      return;
    }

    if (!validateEmail(values.email)) {
      setMessageType('error');
      setMessage('Please enter valid email address!')
      return;
    }

    if (values.password.length < 6) {
      setMessageType('error');
      setMessage('Password must have 6 or more charctors!')
      return;
    }

    if (values.password !== values.retypePassword) {
      setMessageType('error');
      setMessage('Password and re-type password must be equal!')
      return;
    }

    if (!validatePhone(values.phoneNumber)) {
      setMessageType('error');
      setMessage('Entered phone number is not in valid format!')
      return;
    }

    const db = getDatabase();
    try {
      push(ref(db, '/applications'), values);
      setMessageType('success');
      setMessage('Your form has submitted successfully!')
    } catch (e) {
      setMessageType('error');
      setMessage('Please try again, form submission failed!')
    }

  }
  return (
    <div className="container">
      <form className="main" onSubmit={handleSubmit}>
        <div className="header">
          <h1>JobSearch</h1>
        </div>
        <div className='sub-header'>
          <h3>Create Your Account</h3>
          <p>*Required Information</p>
        </div>
        <div className='form-box'>
          <div className='form-header'>
            <h4>Basic Information</h4>
          </div>
          <div className='form-content'>
            <div className='form-row'>
              <div className='form-row-left'>
                <label htmlFor="email" className='form-label required'>email</label>
              </div>
              <div className='form-row-right'>
                <input name="email" type="text" className='form-input' />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-row-left'>
                <label htmlFor="password" className='form-label required'>password</label>
              </div>
              <div className='form-row-right'>
                <input type="password" name="password" className='form-input' />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-row-left'>
                <label htmlFor="retypePassword" className='form-label required'>re-type Password</label>
              </div>
              <div className='form-row-right'>
                <input type="password" name="retypePassword" className='form-input' />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-row-left'>
                <label htmlFor="firstName" className='form-label required'>first name</label>
              </div>
              <div className='form-row-right'>
                <input name="firstName" className='form-input' />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-row-left'>
                <label htmlFor="lastName" className='form-label required'>last name</label>
              </div>
              <div className='form-row-right'>
                <input name="lastName" className='form-input' />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-row-left'>
                <label htmlFor="phoneNumber" className='form-label required'>Phone number</label>
              </div>
              <div className='form-row-right'>
                <input name="phoneNumber" type="tel" className='form-input' placeholder='000-000-0000' />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-row-left'>
                <label htmlFor="address" className='form-label required'>address</label>
              </div>
              <div className='form-row-right'>
                <input name="address" className='form-input' />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-row-left'>
                <label htmlFor="city" className='form-label required'>city</label>
              </div>
              <div className='form-row-right'>
                <input name="city" className='form-input' />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-row-left'>
                <label htmlFor="province" className='form-label required'>province</label>
              </div>
              <div className='form-row-right'>
                <select name="province" id="province" className='form-input'>
                  <option value="Alberta">Alberta</option>
                  <option value="Qubec">Qubec</option>
                  <option value="Ontario">Ontario</option>
                  <option value="BritishColumbia">British Columbia</option>
                </select>
              </div>
            </div>
            <div className='form-row'>
              <div className='form-row-left'>
                <label htmlFor="country" className='form-label required'>country</label>
              </div>
              <div className='form-row-right'>
                <input name="country" className='form-input' />
              </div>
            </div>
          </div>
        </div>

        <div className='form-box'>
          <div className='form-header'>
            <h4>Education</h4>
          </div>
          <div className='form-content'>
            <div className='form-row'>
              <div className='form-row-left'>
                <label htmlFor="school" className='form-label required'>school</label>
              </div>
              <div className='form-row-right'>
                <input name="school" className='form-input' />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-row-left'>
                <label htmlFor="program" className='form-label required'>program</label>
              </div>
              <div className='form-row-right'>
                <input name="program" className='form-input' />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-row-left'>
                <label htmlFor="educationLevel" className='form-label required'>education level</label>
              </div>
              <div className='form-row-right'>
                <select name="educationLevel" id="educationLevel" className='form-input' >
                  <option value="Diploma">Diploma</option>
                  <option value="Bachlors">Bachlors</option>
                  <option value="Masters">Masters</option>
                </select>
              </div>
            </div>
            <div className='form-row'>
              <div className='form-row-left'></div>
              <div className='form-row-right col'>
                <fieldset className='form-fieldset'>
                  <legend>Education Status</legend>
                  <input type="radio" id="graduated" name="educationStatus" value="graduated" />
                  <label htmlFor="graduated">Graduated</label><br />
                  <input type="radio" id="currentEnrolled" name="educationStatus" value="currentEnrolled" />
                  <label htmlFor="currentEnrolled">Current Enrolled</label><br />
                  <input type="radio" id="didNotGraduate" name="educationStatus" value="didNotGraduate" />
                  <label htmlFor="didNotGraduate">Did Not Graduate</label>
                </fieldset>
              </div>
            </div>
            <div className='form-row'>
              <div className='form-row-left'>
                <label htmlFor="graduationDate" className='form-label'>Graduation Date</label>
              </div>
              <div className='form-row-right'>
                <input name="graduationDate" className='form-input' />
              </div>
            </div>
          </div>
        </div>

        <div className='form-box'>
          <div className='form-header'>
            <h4>Work Experience</h4>
          </div>
          <div className='form-content'>
            <div className='form-row'>
              <div className='form-row-left'>
                <label htmlFor="employer" className='form-label'>employer</label>
              </div>
              <div className='form-row-right'>
                <input name="employer" className='form-input' />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-row-left'>
                <label htmlFor="jobTitle" className='form-label'>Job Title</label>
              </div>
              <div className='form-row-right'>
                <input name="jobTitle" className='form-input' />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-row-left'>
                <label htmlFor="jobDuty" className='form-label'>Job Duty</label>
              </div>
              <div className='form-row-right'>
                <textarea rows="3" name="jobDuty" className='form-input' />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-row-left'>
                <label htmlFor="workedyear" className='form-label'>Worked year</label>
              </div>
              <div className='form-row-right'>
                <input name="workedyear" className='form-input' type="number" />
              </div>
            </div>
          </div>
        </div>


        <div className='form-box'>
          <div className='form-header'>
            <h4>Work Experience</h4>
          </div>
          <div className='form-content'>
            <div className='form-row'>
              <div className='form-row-left'>
                <label htmlFor="attachments" className='form-label'>attachments</label>
              </div>
              <div className='form-row-right'>
                <input name="attachments" className='form-input' type="file" />
              </div>
            </div>
          </div>
        </div>

        {message && <p className={`form-message ${messageType}`}>
          {message}
        </p>}
        <div className='form-submit-btns'>
          <button type='reset' onClick={() => { setMessage(''); setMessageType('') }}>Reset</button>
          <button type='submit'>Apply</button>
        </div>
      </form>
    </div>
  )
}
